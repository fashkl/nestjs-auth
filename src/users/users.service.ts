import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async validateCredentials({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<User> {
    const user = await this.findOneByUsername(username);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await this.comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  private async comparePasswords(
    userPassword: string,
    currentPassword: string,
  ) {
    return await bcrypt.compare(currentPassword, userPassword);
  }

  async create({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<User> {
    const userInDb = await this.findOneByUsername(username);
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: User = this.userRepository.create({
      username,
      password,
    });

    await this.userRepository.save(user);

    return user;
  }
}
