import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RegistrationDto } from './dto/registration.dto';
import { Request, Response } from 'express';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Вход пользователя' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 200, description: 'Успешный вход' })
  @ApiResponse({ status: 401, description: 'Неверный логин или пароль' })
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, user } =
      await this.authService.login(dto);
    this.authService.addTokensToResponse(res, accessToken, refreshToken);

    return { user };
  }

  @Post('profile')
  @HttpCode(200)
  @ApiOperation({ summary: 'Получение профиля текущего пользователя' })
  @ApiResponse({ status: 200, description: 'Профиль успешно получен' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  async profile(@Req() req: Request) {
    const token = req.cookies['accessToken'];
    if (!token) {
      throw new UnauthorizedException('Access token not provided');
    }

    const user = await this.authService.getProfile(token);
    return { user };
  }

  @Post('login/access-token')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получение нового access/refresh токена по refresh токену',
  })
  @ApiResponse({ status: 200, description: 'Токены успешно обновлены' })
  @ApiResponse({
    status: 401,
    description: 'Refresh токен не передан или недействителен',
  })
  async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshTokenFromCookie =
      req.cookies[this.authService.REFRESH_TOKEN_NAME];

    if (!refreshTokenFromCookie) {
      this.authService.removeRefreshTokenToResponse(res);
      throw new UnauthorizedException('Refresh token not passed');
    }

    const { accessToken, refreshToken, user } =
      await this.authService.getNewTokens(refreshTokenFromCookie);
    this.authService.addTokensToResponse(res, accessToken, refreshToken);

    return { user };
  }

  @Post('register')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiBody({ type: RegistrationDto })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно зарегистрирован',
  })
  @ApiResponse({ status: 400, description: 'Ошибка валидации данных' })
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegistrationDto,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.register(dto);
    this.authService.addTokensToResponse(res, accessToken, refreshToken);

    return { user };
  }

  @Post('logout')
  @HttpCode(200)
  @ApiOperation({ summary: 'Выход пользователя и удаление refresh токена' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно вышел из системы',
  })
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenToResponse(res);
    return true;
  }
}
