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
exports.CreateScheduleLessonDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateScheduleLessonDto {
}
exports.CreateScheduleLessonDto = CreateScheduleLessonDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID урока',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateScheduleLessonDto.prototype, "lessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Список аудиторий',
        example: ['А-101', 'Б-202'],
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateScheduleLessonDto.prototype, "audiences", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Список ID преподавателей',
        example: [
            '123e4567-e89b-12d3-a456-426614174000',
            '987fcdeb-51a2-43f7-9876-543210987654',
        ],
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('all', { each: true }),
    __metadata("design:type", Array)
], CreateScheduleLessonDto.prototype, "teacherIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID номера урока',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateScheduleLessonDto.prototype, "orderId", void 0);
//# sourceMappingURL=create-schedule-lesson.dto.js.map