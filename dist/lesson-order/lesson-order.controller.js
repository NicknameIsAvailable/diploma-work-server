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
exports.LessonOrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lesson_order_service_1 = require("./lesson-order.service");
const create_lesson_order_dto_1 = require("./dto/create-lesson-order.dto");
const update_lesson_order_dto_1 = require("./dto/update-lesson-order.dto");
const role_decorator_1 = require("../role/role.decorator");
const create_user_dto_1 = require("../user/dto/create-user.dto");
let LessonOrderController = class LessonOrderController {
    constructor(lessonOrderService) {
        this.lessonOrderService = lessonOrderService;
    }
    create(createLessonOrderDto) {
        return this.lessonOrderService.create(createLessonOrderDto);
    }
    findAll() {
        return this.lessonOrderService.findAll();
    }
    findOne(id) {
        return this.lessonOrderService.findOne(id);
    }
    update(id, updateLessonOrderDto) {
        return this.lessonOrderService.update(id, updateLessonOrderDto);
    }
    remove(id) {
        return this.lessonOrderService.remove(id);
    }
};
exports.LessonOrderController = LessonOrderController;
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новый порядок уроков' }),
    (0, swagger_1.ApiBody)({ type: create_lesson_order_dto_1.CreateLessonOrderDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Порядок уроков успешно создан.',
        type: create_lesson_order_dto_1.CreateLessonOrderDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректные данные.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lesson_order_dto_1.CreateLessonOrderDto]),
    __metadata("design:returntype", void 0)
], LessonOrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить список всех порядков уроков' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список успешно получен.',
        type: create_lesson_order_dto_1.CreateLessonOrderDto,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LessonOrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить порядок уроков по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID порядка уроков' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Порядок уроков найден.',
        type: create_lesson_order_dto_1.CreateLessonOrderDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Порядок уроков не найден.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonOrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить порядок уроков по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID порядка уроков' }),
    (0, swagger_1.ApiBody)({ type: update_lesson_order_dto_1.UpdateLessonOrderDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Порядок уроков успешно обновлен.',
        type: create_lesson_order_dto_1.CreateLessonOrderDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Порядок уроков не найден.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lesson_order_dto_1.UpdateLessonOrderDto]),
    __metadata("design:returntype", void 0)
], LessonOrderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_decorator_1.Roles)(create_user_dto_1.EUserRole.TEACHER, create_user_dto_1.EUserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить порядок уроков по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID порядка уроков' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Порядок уроков успешно удален.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Порядок уроков не найден.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonOrderController.prototype, "remove", null);
exports.LessonOrderController = LessonOrderController = __decorate([
    (0, swagger_1.ApiTags)('Очередь уроков'),
    (0, common_1.Controller)('lesson-order'),
    __metadata("design:paramtypes", [lesson_order_service_1.LessonOrderService])
], LessonOrderController);
//# sourceMappingURL=lesson-order.controller.js.map