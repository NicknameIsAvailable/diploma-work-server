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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
const swagger_1 = require("@nestjs/swagger");
class Lesson {
}
exports.Lesson = Lesson;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID записи урока', example: 'uuid-lesson' }),
    __metadata("design:type", String)
], Lesson.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Дата обновления записи',
        example: '2024-12-31T23:59:59.999Z',
    }),
    __metadata("design:type", Date)
], Lesson.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Дата создания записи',
        example: '2024-01-01T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], Lesson.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID аудиторий, в которых проходит урок',
        type: [String],
        example: ['A101', 'A102'],
    }),
    __metadata("design:type", Array)
], Lesson.prototype, "audiences", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID урока', example: 'uuid-lesson-definition' }),
    __metadata("design:type", String)
], Lesson.prototype, "lessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID дня расписания',
        example: 'uuid-schedule-day',
    }),
    __metadata("design:type", String)
], Lesson.prototype, "scheduleDayId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID порядка урока', example: 'uuid-order' }),
    __metadata("design:type", String)
], Lesson.prototype, "orderId", void 0);
//# sourceMappingURL=lesson.entity.js.map