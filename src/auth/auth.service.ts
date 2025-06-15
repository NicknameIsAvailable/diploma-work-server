import { UserService } from 'src/user/user.service';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { verify } from 'argon2';
import { RegistrationDto } from './dto/registration.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private jwt: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  EXPIRE_DAY_REFRESH_TOKEN = 1;
  REFRESH_TOKEN_NAME = 'refreshToken';

  async login(dto: AuthDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...user } = await this.validateUser(dto);
    const { accessToken, refreshToken } = this.issueTokens(user.id);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async getProfile(accessToken: string) {
    const decoded = await this.jwt.verifyAsync(accessToken);
    const user = await this.userService.findOne(decoded.id);
    if (!user) throw new UnauthorizedException('User not found');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  async register(dto: RegistrationDto) {
    const oldUser = await this.userService.findByLogin(dto.login);
    if (oldUser) throw new BadRequestException('User already exists');

    if (dto.password !== dto.repeatPassword)
      throw new BadRequestException("The passwords don't match");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...user } = await this.userService.create(dto);

    const { accessToken, refreshToken } = this.issueTokens(user.id);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  private issueTokens(userId: string) {
    const data = { id: userId };
    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '1d',
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.findByLogin(dto.login);

    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.passwordHash, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid Password');

    return user;
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.userService.findOne(result.id);

    const { accessToken, refreshToken: newRefreshToken } = this.issueTokens(
      user.id,
    );

    return {
      user,
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  addTokensToResponse(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      domain: this.configService.get<string>('DOMAIN'),
      expires: new Date(Date.now() + 1000 * 60 * 60), // 1 час
      secure: true,
      sameSite: 'none',
    });

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: this.configService.get<string>('DOMAIN'),
      expires: expiresIn,
      secure: true,
      // lax if production
      sameSite: 'none',
    });
  }

  removeRefreshTokenToResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: this.configService.get<string>('DOMAIN'),
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }
}
