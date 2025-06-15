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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const location_service_1 = require("./location.service");
const create_location_dto_1 = require("./dto/create-location.dto");
const update_location_dto_1 = require("./dto/update-location.dto");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const role_decorator_1 = require("../role/role.decorator");
let LocationController = class LocationController {
    constructor(locationService) {
        this.locationService = locationService;
    }
    create(createLocationDto) {
        return this.locationService.create(createLocationDto);
    }
    createMany(createLocationDtos) {
        return this.locationService.createMany(createLocationDtos);
    }
    findAll() {
        return this.locationService.findAll();
    }
    findOne(id) {
        return this.locationService.findOne(id);
    }
    update(id, updateLocationDto) {
        return this.locationService.update(id, updateLocationDto);
    }
    remove(id) {
        return this.locationService.remove(id);
    }
};
exports.LocationController = LocationController;
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новую локацию' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Локация успешно создана' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректные данные' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_location_dto_1.CreateLocationDto]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('many'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Создать несколько локаций' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Локации успешно созданы' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректные данные' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "createMany", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить список всех локаций' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список локаций успешно получен' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить локацию по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID локации' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Локация успешно найдена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Локация не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить локацию по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID локации' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Локация успешно обновлена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Локация не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_location_dto_1.UpdateLocationDto]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить локацию по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID локации' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Локация успешно удалена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Локация не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "remove", null);
exports.LocationController = LocationController = __decorate([
    (0, swagger_1.ApiTags)('Локации (Площадки)'),
    (0, common_1.Controller)('location'),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationController);
//# sourceMappingURL=location.controller.js.map