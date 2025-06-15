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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const schedule_service_1 = require("./schedule.service");
const create_schedule_dto_1 = require("./dto/create-schedule.dto");
const update_schedule_dto_1 = require("./dto/update-schedule.dto");
const role_decorator_1 = require("../role/role.decorator");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const excel_parser_service_1 = require("../excel-parser/excel-parser.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const csv_parser_service_1 = require("../csv-parser/csv-parser.service");
const role_guard_1 = require("../role/role.guard");
let ScheduleController = class ScheduleController {
    constructor(scheduleService, excelParserService, csvParserService) {
        this.scheduleService = scheduleService;
        this.excelParserService = excelParserService;
        this.csvParserService = csvParserService;
    }
    create(createScheduleDto) {
        return this.scheduleService.create(createScheduleDto);
    }
    parseSchedule(file) {
        const csv = this.csvParserService.parseScheduleCSV(file.buffer);
        return csv;
    }
    createMany(createScheduleDto) {
        return this.scheduleService.createMany(createScheduleDto);
    }
    findAll(groupIDs) {
        const groupIDsArray = groupIDs ? groupIDs.split(',') : undefined;
        return this.scheduleService.findAll(groupIDsArray);
    }
    findOne(id) {
        return this.scheduleService.findOne(id);
    }
    update(id, updateScheduleDto) {
        return this.scheduleService.update(id, updateScheduleDto);
    }
    remove(id) {
        return this.scheduleService.remove(id);
    }
};
exports.ScheduleController = ScheduleController;
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новое расписание' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Расписание успешно создано',
        type: create_schedule_dto_1.CreateScheduleDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректный запрос' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_schedule_dto_1.CreateScheduleDto]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('parse'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'Парсинг Excel-файла в CSV' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Файл успешно распаршен',
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректный файл' }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof multer_1.File !== "undefined" && multer_1.File) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "parseSchedule", null);
__decorate([
    (0, common_1.Post)('many'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Создать несколько расписаний' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Расписания успешно созданы',
        type: [create_schedule_dto_1.CreateScheduleDto],
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
], ScheduleController.prototype, "createMany", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить все расписания с возможностью фильтрации',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'groupIDs',
        required: false,
        description: 'ID групп через запятую',
        type: String,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'teacherIDs',
        required: false,
        description: 'ID преподавателей через запятую',
        type: String,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'lessonIDs',
        required: false,
        description: 'ID уроков через запятую',
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возвращает список расписаний',
        type: [create_schedule_dto_1.CreateScheduleDto],
    }),
    __param(0, (0, common_1.Query)('groupIDs')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить расписание по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID расписания' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возвращает расписание',
        type: create_schedule_dto_1.CreateScheduleDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Расписание не найдено' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить расписание по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID расписания' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Расписание успешно обновлено',
        type: create_schedule_dto_1.CreateScheduleDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Расписание не найдено' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_schedule_dto_1.UpdateScheduleDto]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить расписание по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID расписания' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Расписание успешно удалено' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Доступ запрещен. Требуются права администратора',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Расписание не найдено' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "remove", null);
exports.ScheduleController = ScheduleController = __decorate([
    (0, swagger_1.ApiTags)('Расписание'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('schedule'),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService,
        excel_parser_service_1.ExcelParserService,
        csv_parser_service_1.CsvParserService])
], ScheduleController);
//# sourceMappingURL=schedule.controller.js.map