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
exports.GroupController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const group_service_1 = require("./group.service");
const create_group_dto_1 = require("./dto/create-group.dto");
const update_group_dto_1 = require("./dto/update-group.dto");
const role_decorator_1 = require("../role/role.decorator");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const role_guard_1 = require("../role/role.guard");
let GroupController = class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    create(createGroupDto) {
        return this.groupService.create(createGroupDto);
    }
    createMany(createGroupDto) {
        return this.groupService.createMany(createGroupDto);
    }
    findAll() {
        return this.groupService.findAll();
    }
    findOne(id) {
        return this.groupService.findOne(id);
    }
    update(id, updateGroupDto) {
        return this.groupService.update(id, updateGroupDto);
    }
    remove(id) {
        return this.groupService.remove(id);
    }
};
exports.GroupController = GroupController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новую группу' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Группа успешно создана',
        type: create_group_dto_1.CreateGroupDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректный запрос' }),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_group_dto_1.CreateGroupDto]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('many'),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Создать несколько групп' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Группы успешно созданы',
        type: [create_group_dto_1.CreateGroupDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректный запрос' }),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "createMany", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить список всех групп' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возвращает список всех групп',
        type: [create_group_dto_1.CreateGroupDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить группу по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID группы' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возвращает группу',
        type: create_group_dto_1.CreateGroupDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Группа не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить группу по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID группы' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Группа успешно обновлена',
        type: create_group_dto_1.CreateGroupDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Группа не найдена' }),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_group_dto_1.UpdateGroupDto]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить группу по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID группы' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Группа успешно удалена' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Группа не найдена' }),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "remove", null);
exports.GroupController = GroupController = __decorate([
    (0, swagger_1.ApiTags)('Группы'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('group'),
    __metadata("design:paramtypes", [group_service_1.GroupService])
], GroupController);
//# sourceMappingURL=group.controller.js.map