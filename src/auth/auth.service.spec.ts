import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
        {
          provide: UsersService,
          useValue: {
            validateCredentials: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        }],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('Service should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an access token if credentials are valid', async () => {
      const username = 'testuser';
      const password = 'password';
      const user = new User();
      user.username = username;
      user.password = await bcrypt.hash(password, 10);
      jest.spyOn(usersService, 'validateCredentials').mockResolvedValue(user);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');

      const result = await authService.signIn('testuser', 'password');
      expect(result).toEqual({ access_token: 'token' });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      jest.spyOn(usersService, 'validateCredentials').mockResolvedValue(null);

      await expect(authService.signIn('testuser', 'password')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('signUp', () => {
    it('should return the created user without password', async () => {
      const username = 'testuser';
      const password = 'password';
      const user = new User();
      user.id = username;
      user.username = username;
      user.password = await bcrypt.hash(password, 10);
      jest.spyOn(usersService, 'create').mockResolvedValue(user);

      const result = await authService.signUp('testuser', 'password');
      expect(result).toEqual({ id: username, username: 'testuser' });
    });

    it('should throw InternalServerErrorException if user creation fails', async () => {
      jest.spyOn(usersService, 'create').mockResolvedValue(null);

      await expect(authService.signUp('testuser', 'password')).rejects.toThrow(InternalServerErrorException);
    });
  });

});
