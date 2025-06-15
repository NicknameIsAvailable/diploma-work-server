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
exports.AuthDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class AuthDto {
}
exports.AuthDto = AuthDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Логин пользователя',
        example: 'username',
    }),
    __metadata("design:type", String)
], AuthDto.prototype, "login", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Пароль пользователя (от 6 до 120 символов)',
        minLength: 6,
        maxLength: 120,
        example: 'strongpassword123',
    }),
    (0, class_validator_1.MinLength)(6, {
        message: 'Password must be at least 6 characters long',
    }),
    (0, class_validator_1.MaxLength)(120, {
        message: 'Password max length is 120 characters',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthDto.prototype, "password", void 0);
//# sourceMappingURL=auth.dto.js.map