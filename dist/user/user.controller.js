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
exports.UserController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const role_decorator_1 = require("../role/role.decorator");
const role_guard_1 = require("../role/role.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    createMany(createUserDto) {
        return this.userService.createMany(createUserDto);
    }
    findAll(query) {
        return this.userService.findAll(query);
    }
    findOne(id) {
        return this.userService.findOne(id);
    }
    update(id, updateUserDto) {
        return this.userService.update(id, updateUserDto);
    }
    remove(id) {
        return this.userService.remove(id);
    }
    removeMany(userIds) {
        return this.userService.removeMany(userIds);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Создать нового пользователя' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Пользователь успешно создан',
        type: create_user_dto_1.CreateUserDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректный запрос' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('many'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Создать несколько пользователей' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Пользователи успешно созданы',
        type: [create_user_dto_1.CreateUserDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректный запрос' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createMany", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить список всех пользователей с фильтрацией' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возвращает список всех пользователей',
        type: [create_user_dto_1.CreateUserDto],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить пользователя по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID пользователя' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возвращает пользователя',
        type: create_user_dto_1.CreateUserDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Пользователь не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить пользователя по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID пользователя' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Пользователь успешно обновлен',
        type: create_user_dto_1.CreateUserDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Пользователь не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить пользователя по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Пользователь успешно удален' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Пользователь не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('many'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить нескольких пользователей' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Пользователи успешно удалены' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректный запрос' }),
    __param(0, (0, common_1.Param)('userIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeMany", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Пользователи'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map