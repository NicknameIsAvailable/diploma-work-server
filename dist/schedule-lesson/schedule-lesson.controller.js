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
exports.ScheduleLessonController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const schedule_lesson_service_1 = require("./schedule-lesson.service");
const create_schedule_lesson_dto_1 = require("./dto/create-schedule-lesson.dto");
const update_schedule_lesson_dto_1 = require("./dto/update-schedule-lesson.dto");
const role_decorator_1 = require("../role/role.decorator");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const role_guard_1 = require("../role/role.guard");
let ScheduleLessonController = class ScheduleLessonController {
    constructor(scheduleLessonService) {
        this.scheduleLessonService = scheduleLessonService;
    }
    create(createScheduleLessonDto) {
        return this.scheduleLessonService.create(createScheduleLessonDto);
    }
    createMany(createScheduleLessonDto) {
        return this.scheduleLessonService.createMany(createScheduleLessonDto);
    }
    findAll() {
        return this.scheduleLessonService.findAll();
    }
    findOne(id) {
        return this.scheduleLessonService.findOne(id);
    }
    update(id, updateScheduleLessonDto) {
        return this.scheduleLessonService.update(id, updateScheduleLessonDto);
    }
    remove(id) {
        return this.scheduleLessonService.remove(id);
    }
};
exports.ScheduleLessonController = ScheduleLessonController;
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новый урок в расписании' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Урок в расписании успешно создан',
        type: create_schedule_lesson_dto_1.CreateScheduleLessonDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректный запрос' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_schedule_lesson_dto_1.CreateScheduleLessonDto]),
    __metadata("design:returntype", void 0)
], ScheduleLessonController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('many'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Создать несколько уроков в расписании' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Уроки в расписании успешно созданы',
        type: [create_schedule_lesson_dto_1.CreateScheduleLessonDto],
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
], ScheduleLessonController.prototype, "createMany", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить список всех уроков в расписании' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возвращает список всех уроков в расписании',
        type: [create_schedule_lesson_dto_1.CreateScheduleLessonDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ScheduleLessonController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить урок в расписании по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID урока в расписании' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возвращает урок в расписании',
        type: create_schedule_lesson_dto_1.CreateScheduleLessonDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Урок в расписании не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScheduleLessonController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить урок в расписании по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID урока в расписании' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Урок в расписании успешно обновлен',
        type: create_schedule_lesson_dto_1.CreateScheduleLessonDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Урок в расписании не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_schedule_lesson_dto_1.UpdateScheduleLessonDto]),
    __metadata("design:returntype", void 0)
], ScheduleLessonController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить урок в расписании по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID урока в расписании' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Урок в расписании успешно удален' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Урок в расписании не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScheduleLessonController.prototype, "remove", null);
exports.ScheduleLessonController = ScheduleLessonController = __decorate([
    (0, swagger_1.ApiTags)('Уроки в расписании'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('schedule-lesson'),
    __metadata("design:paramtypes", [schedule_lesson_service_1.ScheduleLessonService])
], ScheduleLessonController);
//# sourceMappingURL=schedule-lesson.controller.js.map