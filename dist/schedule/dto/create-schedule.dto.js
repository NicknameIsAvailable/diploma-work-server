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
exports.CreateScheduleDto = exports.ScheduleDayDto = exports.ScheduleLessonDto = exports.DayEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var DayEnum;
(function (DayEnum) {
    DayEnum["MONDAY"] = "monday";
    DayEnum["TUESDAY"] = "tuesday";
    DayEnum["WEDNESDAY"] = "wednesday";
    DayEnum["THURSDAY"] = "thursday";
    DayEnum["FRIDAY"] = "friday";
    DayEnum["SATURDAY"] = "saturday";
    DayEnum["SUNDAY"] = "sunday";
})(DayEnum || (exports.DayEnum = DayEnum = {}));
class ScheduleLessonDto {
}
exports.ScheduleLessonDto = ScheduleLessonDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Уникальный идентификатор урока',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ScheduleLessonDto.prototype, "lessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Порядковый номер урока (от 0 до 7)',
        minimum: 0,
        maximum: 7,
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(7),
    __metadata("design:type", Number)
], ScheduleLessonDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Массив ID аудиторий (от 1 до 2 элементов)',
        type: [String],
        example: ['A101', 'A102'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.Max)(2),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Array)
], ScheduleLessonDto.prototype, "audiences", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Массив ID преподавателей (от 1 до 2 элементов)',
        type: [String],
        example: ['123e4567-e89b-12d3-a456-426614174000'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.Max)(2),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Array)
], ScheduleLessonDto.prototype, "teacherIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID номера урока',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ScheduleLessonDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID связанного расписания дня',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ScheduleLessonDto.prototype, "scheduleDayId", void 0);
class ScheduleDayDto {
}
exports.ScheduleDayDto = ScheduleDayDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: DayEnum,
        description: 'День недели',
        example: DayEnum.MONDAY,
        enumName: 'День недели',
    }),
    (0, class_validator_1.IsEnum)(DayEnum),
    __metadata("design:type", String)
], ScheduleDayDto.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [ScheduleLessonDto],
        description: 'Массив уроков (от 2 до 8 уроков)',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.Min)(2),
    (0, class_validator_1.Max)(8),
    __metadata("design:type", Array)
], ScheduleDayDto.prototype, "lessons", void 0);
class CreateScheduleDto {
}
exports.CreateScheduleDto = CreateScheduleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID группы',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [ScheduleDayDto],
        description: 'Расписание на неделю',
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateScheduleDto.prototype, "week", void 0);
//# sourceMappingURL=create-schedule.dto.js.map