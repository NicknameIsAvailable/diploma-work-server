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
exports.CreateGroupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateGroupDto {
}
exports.CreateGroupDto = CreateGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Название группы',
        example: 'Группа A-101',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Массив ID студентов в группе',
        type: [String],
        example: [
            '123e4567-e89b-12d3-a456-426614174000',
            '987fcdeb-51a2-43f7-9876-543210987654',
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('all', { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateGroupDto.prototype, "studentIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID куратора группы',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "curatorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID специальности группы',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: false,
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "specialityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Год начала обучения',
        example: 2023,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2000),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateGroupDto.prototype, "startYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Год окончания обучения',
        example: 2024,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2000),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateGroupDto.prototype, "endYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Курс группы',
        example: 2,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateGroupDto.prototype, "course", void 0);
//# sourceMappingURL=create-group.dto.js.map