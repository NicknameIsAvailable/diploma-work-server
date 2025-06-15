"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleLessonModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_lesson_service_1 = require("./schedule-lesson.service");
const schedule_lesson_controller_1 = require("./schedule-lesson.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
let ScheduleLessonModule = class ScheduleLessonModule {
};
exports.ScheduleLessonModule = ScheduleLessonModule;
exports.ScheduleLessonModule = ScheduleLessonModule = __decorate([
    (0, common_1.Module)({
        controllers: [schedule_lesson_controller_1.ScheduleLessonController],
        providers: [schedule_lesson_service_1.ScheduleLessonService, prisma_service_1.PrismaService, jwt_1.JwtService],
    })
], ScheduleLessonModule);
//# sourceMappingURL=schedule-lesson.module.js.map