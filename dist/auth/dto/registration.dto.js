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
exports.RegistrationDto = exports.EUserRole = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var EUserRole;
(function (EUserRole) {
    EUserRole["TEACHER"] = "TEACHER";
    EUserRole["STUDENT"] = "STUDENT";
    EUserRole["ADMIN"] = "ADMIN";
})(EUserRole || (exports.EUserRole = EUserRole = {}));
class RegistrationDto {
}
exports.RegistrationDto = RegistrationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Имя пользователя',
        example: 'Иван',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Фамилия пользователя',
        example: 'Иванов',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationDto.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Логин пользователя',
        example: 'ivanov123',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationDto.prototype, "login", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email пользователя',
        example: 'ivan@example.com',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Пароль пользователя',
        example: 'password123',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Повторите пароль пользователя',
        example: 'password123',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationDto.prototype, "repeatPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID группы пользователя',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], RegistrationDto.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Роль пользователя',
        enum: EUserRole,
        example: EUserRole.STUDENT,
        enumName: 'Роль пользователя',
    }),
    (0, class_validator_1.IsEnum)(EUserRole),
    __metadata("design:type", String)
], RegistrationDto.prototype, "role", void 0);
//# sourceMappingURL=registration.dto.js.map