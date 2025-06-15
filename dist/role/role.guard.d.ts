import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private jwt;
    private prisma;
    private configService;
    constructor(reflector: Reflector, jwt: JwtService, prisma: PrismaService, configService: ConfigService);
    getRole(accessToken: string): Promise<import("@prisma/client").$Enums.UserRole>;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
