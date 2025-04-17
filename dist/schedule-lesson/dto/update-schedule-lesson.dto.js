"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScheduleLessonDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_schedule_lesson_dto_1 = require("./create-schedule-lesson.dto");
class UpdateScheduleLessonDto extends (0, mapped_types_1.PartialType)(create_schedule_lesson_dto_1.CreateScheduleLessonDto) {
}
exports.UpdateScheduleLessonDto = UpdateScheduleLessonDto;
//# sourceMappingURL=update-schedule-lesson.dto.js.map