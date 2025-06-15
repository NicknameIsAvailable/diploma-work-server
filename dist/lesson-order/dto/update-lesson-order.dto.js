"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLessonOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_lesson_order_dto_1 = require("./create-lesson-order.dto");
class UpdateLessonOrderDto extends (0, swagger_1.PartialType)(create_lesson_order_dto_1.CreateLessonOrderDto) {
}
exports.UpdateLessonOrderDto = UpdateLessonOrderDto;
//# sourceMappingURL=update-lesson-order.dto.js.map