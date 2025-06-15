"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonOrderModule = void 0;
const common_1 = require("@nestjs/common");
const lesson_order_service_1 = require("./lesson-order.service");
const lesson_order_controller_1 = require("./lesson-order.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let LessonOrderModule = class LessonOrderModule {
};
exports.LessonOrderModule = LessonOrderModule;
exports.LessonOrderModule = LessonOrderModule = __decorate([
    (0, common_1.Module)({
        controllers: [lesson_order_controller_1.LessonOrderController],
        providers: [lesson_order_service_1.LessonOrderService, prisma_service_1.PrismaService],
    })
], LessonOrderModule);
//# sourceMappingURL=lesson-order.module.js.map