import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { EUserRole } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwt: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async getRole(accessToken: string) {
    try {
      const secret = this.configService.get('JWT_SECRET');
      if (!secret) {
        throw new Error('JWT_SECRET is not configured');
      }
      const decoded = await this.jwt.verifyAsync(accessToken, { secret });
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.id },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user.role;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<EUserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies?.accessToken;

    if (!accessToken) {
      throw new UnauthorizedException('Access token not found');
    }

    try {
      const role = await this.getRole(accessToken);
      if (!requiredRoles.includes(role as EUserRole)) {
        throw new ForbiddenException('Недостаточно прав');
      }
      return true;
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
