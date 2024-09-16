import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseTimeStampEntity } from '../database/base-entity';

@Entity({ name: 'users' })
export class User extends BaseTimeStampEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
