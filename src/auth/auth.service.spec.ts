import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { verify } from 'argon2';
import { ConfigService } from '@nestjs/config';

jest.mock('argon2');

describe('AuthService', () => {
  let service: AuthService;
  let userService: Partial<Record<keyof UserService, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;

  beforeEach(async () => {
    userService = {
      findByLogin: jest.fn(),
      create: jest.fn(),
      findOne: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('signed-token'),
      verifyAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: jwtService },
        {
          provide: ConfigService,
          useValue: { get: () => 'localhost' },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('login: should return user and tokens', async () => {
    userService.findByLogin.mockResolvedValue({
      id: '1',
      passwordHash: 'hash',
    });
    (verify as jest.Mock).mockResolvedValue(true);

    const result = await service.login({ login: 'test', password: 'pass' });

    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('refreshToken');
  });

  it('login: should throw if user not found', async () => {
    userService.findByLogin.mockResolvedValue(null);

    await expect(
      service.login({ login: 'bad', password: 'pass' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('login: should throw if password invalid', async () => {
    userService.findByLogin.mockResolvedValue({
      id: '1',
      passwordHash: 'hash',
    });
    (verify as jest.Mock).mockResolvedValue(false);

    await expect(
      service.login({ login: 'test', password: 'wrong' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('getNewTokens: should throw if token invalid', async () => {
    jwtService.verifyAsync.mockResolvedValue(null);

    await expect(service.getNewTokens('bad-token')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('getNewTokens: should return user and tokens', async () => {
    jwtService.verifyAsync.mockResolvedValue({ id: '1' });
    userService.findOne.mockResolvedValue({ id: '1' });

    const result = await service.getNewTokens('valid-token');
    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('refreshToken');
  });
});
