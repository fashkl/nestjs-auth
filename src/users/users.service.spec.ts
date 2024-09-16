import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';


describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneByUsername', () => {
    it('should return a user if found', async () => {
      const username = 'testuser';
      const user = new User();
      user.username = username;

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      expect(await service.findOneByUsername(username)).toEqual(user);
    });

    it('should return undefined if user not found', async () => {
      const username = 'testuser';

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      expect(await service.findOneByUsername(username)).toBeUndefined();
    });
  });

  describe('validateCredentials', () => {
    it('should return a user if credentials are valid', async () => {
      const username = 'testuser';
      const password = 'password';
      const user = new User();
      user.username = username;
      user.password = await bcrypt.hash(password, 10);

      jest.spyOn(service, 'findOneByUsername').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      expect(await service.validateCredentials({ username, password })).toEqual(user);
    });

    it('should throw HttpException if user not found', async () => {
      const username = 'testuser';
      const password = 'password';

      jest.spyOn(service, 'findOneByUsername').mockResolvedValue(undefined);

      await expect(service.validateCredentials({ username, password })).rejects.toThrow(HttpException);
    });

    it('should throw HttpException if password is invalid', async () => {
      const username = 'testuser';
      const password = 'password';
      const user = new User();
      user.username = username;
      user.password = await bcrypt.hash('wrongpassword', 10);

      jest.spyOn(service, 'findOneByUsername').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(service.validateCredentials({ username, password })).rejects.toThrow(HttpException);
    });
  });

  describe('create', () => {
    it('should return the created user without password', async () => {
      const username = 'testuser';
      const password = 'password';
      const user = new User();
      user.username = username;
      user.password = await bcrypt.hash(password, 10);

      jest.spyOn(service, 'findOneByUsername').mockResolvedValue(undefined);
      jest.spyOn(repository, 'create').mockReturnValue(user);
      jest.spyOn(repository, 'save').mockResolvedValue(user);

      const result = await service.create({ username, password });
      expect(result).toMatchObject({ id: user.id, username: user.username });
    });

    it('should throw HttpException if user already exists', async () => {
      const username = 'testuser';
      const password = 'password';
      const user = new User();
      user.username = username;

      jest.spyOn(service, 'findOneByUsername').mockResolvedValue(user);

      await expect(service.create({ username, password })).rejects.toThrow(HttpException);
    });
  });

});
