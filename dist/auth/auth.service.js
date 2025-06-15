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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_service_1 = require("../user/user.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const argon2_1 = require("argon2");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(jwt, userService, configService) {
        this.jwt = jwt;
        this.userService = userService;
        this.configService = configService;
        this.EXPIRE_DAY_REFRESH_TOKEN = 1;
        this.REFRESH_TOKEN_NAME = 'refreshToken';
    }
    async login(dto) {
        const { passwordHash, ...user } = await this.validateUser(dto);
        const { accessToken, refreshToken } = this.issueTokens(user.id);
        return {
            user,
            accessToken,
            refreshToken,
        };
    }
    async getProfile(accessToken) {
        const decoded = await this.jwt.verifyAsync(accessToken);
        const user = await this.userService.findOne(decoded.id);
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const { passwordHash, ...safeUser } = user;
        return safeUser;
    }
    async register(dto) {
        const oldUser = await this.userService.findByLogin(dto.login);
        if (oldUser)
            throw new common_1.BadRequestException('User already exists');
        if (dto.password !== dto.repeatPassword)
            throw new common_1.BadRequestException("The passwords don't match");
        const { passwordHash, ...user } = await this.userService.create(dto);
        const { accessToken, refreshToken } = this.issueTokens(user.id);
        return {
            user,
            accessToken,
            refreshToken,
        };
    }
    issueTokens(userId) {
        const data = { id: userId };
        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h',
        });
        const refreshToken = this.jwt.sign(data, {
            expiresIn: '1d',
        });
        return { accessToken, refreshToken };
    }
    async validateUser(dto) {
        const user = await this.userService.findByLogin(dto.login);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const isValid = await (0, argon2_1.verify)(user.passwordHash, dto.password);
        if (!isValid)
            throw new common_1.UnauthorizedException('Invalid Password');
        return user;
    }
    async getNewTokens(refreshToken) {
        const result = await this.jwt.verifyAsync(refreshToken);
        if (!result)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        const user = await this.userService.findOne(result.id);
        const { accessToken, refreshToken: newRefreshToken } = this.issueTokens(user.id);
        return {
            user,
            accessToken,
            refreshToken: newRefreshToken,
        };
    }
    addTokensToResponse(res, accessToken, refreshToken) {
        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            domain: this.configService.get('DOMAIN'),
            expires: new Date(Date.now() + 1000 * 60 * 60),
            secure: true,
            sameSite: 'none',
        });
        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            domain: this.configService.get('DOMAIN'),
            expires: expiresIn,
            secure: true,
            sameSite: 'none',
        });
    }
    removeRefreshTokenToResponse(res) {
        res.cookie(this.REFRESH_TOKEN_NAME, '', {
            httpOnly: true,
            domain: this.configService.get('DOMAIN'),
            expires: new Date(0),
            secure: true,
            sameSite: 'none',
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)()),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map