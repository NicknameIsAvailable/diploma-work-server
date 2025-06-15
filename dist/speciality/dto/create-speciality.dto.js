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
exports.CreateSpecialityDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateSpecialityDto {
}
exports.CreateSpecialityDto = CreateSpecialityDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Название специальности',
        example: 'Инженер-строитель',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpecialityDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Номер специальности',
        example: '12345',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpecialityDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Код специальности',
        example: 'C123',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpecialityDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Описание специальности',
        example: 'Специальность, связанная с проектированием и строительством зданий.',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpecialityDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID площадки',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateSpecialityDto.prototype, "locationId", void 0);
//# sourceMappingURL=create-speciality.dto.js.map