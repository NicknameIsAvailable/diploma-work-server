import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: Partial<Record<keyof AuthService, jest.Mock>>;

  beforeEach(async () => {
    authService = {
      login: jest.fn(),
      getNewTokens: jest.fn(),
      register: jest.fn(),
      addRefreshTokenToResponse: jest.fn(),
      removeRefreshTokenToResponse: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('login: should call authService.login and add token to response', async () => {
    const mockRes = { cookie: jest.fn() } as any;
    authService.login.mockResolvedValue({
      refreshToken: 'rt',
      user: { id: '1' },
      accessToken: 'at',
    });

    const result = await controller.login(
      { login: 'test', password: 'pass' },
      mockRes,
    );

    expect(authService.login).toHaveBeenCalled();
    expect(authService.addRefreshTokenToResponse).toHaveBeenCalledWith(
      mockRes,
      'rt',
    );
    expect(result).toHaveProperty('user');
  });

  it('getNewTokens: should throw if no refresh token', async () => {
    const mockReq = { cookies: {} } as any;
    const mockRes = { cookie: jest.fn() } as any;

    await expect(controller.getNewTokens(mockReq, mockRes)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('getNewTokens: should call authService.getNewTokens', async () => {
    const mockReq = { cookies: { refreshToken: 'rt' } } as any;
    const mockRes = { cookie: jest.fn() } as any;
    authService.getNewTokens.mockResolvedValue({
      refreshToken: 'rt',
      accessToken: 'at',
      user: {},
    });

    await controller.getNewTokens(mockReq, mockRes);

    expect(authService.getNewTokens).toHaveBeenCalledWith('rt');
  });

  it('logout: should call removeRefreshTokenToResponse and return true', async () => {
    const mockRes = { cookie: jest.fn() } as any;
    const result = await controller.logout(mockRes);
    expect(authService.removeRefreshTokenToResponse).toHaveBeenCalledWith(
      mockRes,
    );
    expect(result).toBe(true);
  });
});
