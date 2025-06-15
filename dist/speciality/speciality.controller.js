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
exports.SpecialityController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const speciality_service_1 = require("./speciality.service");
const create_speciality_dto_1 = require("./dto/create-speciality.dto");
const update_speciality_dto_1 = require("./dto/update-speciality.dto");
const role_decorator_1 = require("../role/role.decorator");
const create_user_dto_1 = require("../user/dto/create-user.dto");
let SpecialityController = class SpecialityController {
    constructor(specialityService) {
        this.specialityService = specialityService;
    }
    create(createSpecialityDto) {
        return this.specialityService.create(createSpecialityDto);
    }
    createMany(createSpecialityDtos) {
        return this.specialityService.createMany(createSpecialityDtos);
    }
    findAll() {
        return this.specialityService.findAll();
    }
    findOne(id) {
        return this.specialityService.findOne(id);
    }
    update(id, updateSpecialityDto) {
        return this.specialityService.update(id, updateSpecialityDto);
    }
    remove(id) {
        return this.specialityService.remove(id);
    }
};
exports.SpecialityController = SpecialityController;
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новую специальность' }),
    (0, swagger_1.ApiBody)({ type: create_speciality_dto_1.CreateSpecialityDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Специальность успешно создана',
        type: create_speciality_dto_1.CreateSpecialityDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректные данные' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_speciality_dto_1.CreateSpecialityDto]),
    __metadata("design:returntype", Object)
], SpecialityController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('many'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Создать несколько специальностей' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Специальности успешно созданы' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректные данные' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], SpecialityController.prototype, "createMany", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить список всех специальностей' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список успешно получен',
        type: create_speciality_dto_1.CreateSpecialityDto,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], SpecialityController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить специальность по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID специальности' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Специальность найдена',
        type: create_speciality_dto_1.CreateSpecialityDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Специальность не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], SpecialityController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить специальность по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID специальности' }),
    (0, swagger_1.ApiBody)({ type: update_speciality_dto_1.UpdateSpecialityDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Специальность успешно обновлена',
        type: create_speciality_dto_1.CreateSpecialityDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Специальность не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_speciality_dto_1.UpdateSpecialityDto]),
    __metadata("design:returntype", Object)
], SpecialityController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить специальность по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID специальности' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Специальность успешно удалена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Специальность не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpecialityController.prototype, "remove", null);
exports.SpecialityController = SpecialityController = __decorate([
    (0, swagger_1.ApiTags)('Специальности'),
    (0, common_1.Controller)('speciality'),
    __metadata("design:paramtypes", [speciality_service_1.SpecialityService])
], SpecialityController);
//# sourceMappingURL=speciality.controller.js.map