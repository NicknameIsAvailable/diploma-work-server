"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSpecialityDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_speciality_dto_1 = require("./create-speciality.dto");
class UpdateSpecialityDto extends (0, swagger_1.PartialType)(create_speciality_dto_1.CreateSpecialityDto) {
}
exports.UpdateSpecialityDto = UpdateSpecialityDto;
//# sourceMappingURL=update-speciality.dto.js.map