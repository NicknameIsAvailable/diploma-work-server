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
exports.LessonController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const lesson_service_1 = require("./lesson.service");
const create_lesson_dto_1 = require("./dto/create-lesson.dto");
const update_lesson_dto_1 = require("./dto/update-lesson.dto");
const role_decorator_1 = require("../role/role.decorator");
const create_user_dto_1 = require("../user/dto/create-user.dto");
let LessonController = class LessonController {
    constructor(lessonService) {
        this.lessonService = lessonService;
    }
    create(createLessonDto) {
        return this.lessonService.create(createLessonDto);
    }
    createMany(data) {
        return this.lessonService.createMany(data);
    }
    findAll() {
        return this.lessonService.findAll();
    }
    findOne(id) {
        return this.lessonService.findOne(id);
    }
    update(id, updateLessonDto) {
        return this.lessonService.update(id, updateLessonDto);
    }
    remove(id) {
        return this.lessonService.remove(id);
    }
};
exports.LessonController = LessonController;
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новый урок' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Урок успешно создан',
        type: create_lesson_dto_1.CreateLessonDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректный запрос' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lesson_dto_1.CreateLessonDto]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('many'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Создать несколько уроков' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Уроки успешно созданы',
        type: [create_lesson_dto_1.CreateLessonDto],
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
], LessonController.prototype, "createMany", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить список всех уроков' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возвращает список всех уроков',
        type: [create_lesson_dto_1.CreateLessonDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить урок по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID урока' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возвращает урок',
        type: create_lesson_dto_1.CreateLessonDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Урок не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить урок по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID урока' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Урок успешно обновлен',
        type: create_lesson_dto_1.CreateLessonDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Урок не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lesson_dto_1.UpdateLessonDto]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить урок по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID урока' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Урок успешно удален' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Урок не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "remove", null);
exports.LessonController = LessonController = __decorate([
    (0, swagger_1.ApiTags)('Уроки'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('lesson'),
    __metadata("design:paramtypes", [lesson_service_1.LessonService])
], LessonController);
//# sourceMappingURL=lesson.controller.js.map