"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const role_decorator_1 = require("./role.decorator");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("@nestjs/config");
let RolesGuard = class RolesGuard {
    constructor(reflector, jwt, prisma, configService) {
        this.reflector = reflector;
        this.jwt = jwt;
        this.prisma = prisma;
        this.configService = configService;
    }
    async getRole(accessToken) {
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
                throw new common_1.UnauthorizedException('User not found');
            }
            return user.role;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(role_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const accessToken = request.cookies?.accessToken;
        if (!accessToken) {
            throw new common_1.UnauthorizedException('Access token not found');
        }
        try {
            const role = await this.getRole(accessToken);
            if (!requiredRoles.includes(role)) {
                throw new common_1.ForbiddenException('Недостаточно прав');
            }
            return true;
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException ||
                error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('Authentication failed');
        }
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        prisma_service_1.PrismaService,
        config_1.ConfigService])
], RolesGuard);
//# sourceMappingURL=role.guard.js.map