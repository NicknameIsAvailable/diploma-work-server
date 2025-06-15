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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const registration_dto_1 = require("./dto/registration.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(dto, res) {
        const { accessToken, refreshToken, user } = await this.authService.login(dto);
        this.authService.addTokensToResponse(res, accessToken, refreshToken);
        return { user };
    }
    async profile(req) {
        const token = req.cookies['accessToken'];
        if (!token) {
            throw new common_1.UnauthorizedException('Access token not provided');
        }
        const user = await this.authService.getProfile(token);
        return { user };
    }
    async getNewTokens(req, res) {
        const refreshTokenFromCookie = req.cookies[this.authService.REFRESH_TOKEN_NAME];
        if (!refreshTokenFromCookie) {
            this.authService.removeRefreshTokenToResponse(res);
            throw new common_1.UnauthorizedException('Refresh token not passed');
        }
        const { accessToken, refreshToken, user } = await this.authService.getNewTokens(refreshTokenFromCookie);
        this.authService.addTokensToResponse(res, accessToken, refreshToken);
        return { user };
    }
    async register(res, dto) {
        const { accessToken, refreshToken, user } = await this.authService.register(dto);
        this.authService.addTokensToResponse(res, accessToken, refreshToken);
        return { user };
    }
    async logout(res) {
        this.authService.removeRefreshTokenToResponse(res);
        return true;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Вход пользователя' }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.AuthDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Успешный вход' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Неверный логин или пароль' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('profile'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Получение профиля текущего пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Профиль успешно получен' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "profile", null);
__decorate([
    (0, common_1.Post)('login/access-token'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({
        summary: 'Получение нового access/refresh токена по refresh токену',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Токены успешно обновлены' }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Refresh токен не передан или недействителен',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getNewTokens", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Регистрация нового пользователя' }),
    (0, swagger_1.ApiBody)({ type: registration_dto_1.RegistrationDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Пользователь успешно зарегистрирован',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Ошибка валидации данных' }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, registration_dto_1.RegistrationDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Выход пользователя и удаление refresh токена' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Пользователь успешно вышел из системы',
    }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Авторизация'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map