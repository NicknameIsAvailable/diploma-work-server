"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvParserModule = void 0;
const common_1 = require("@nestjs/common");
const csv_parser_service_1 = require("./csv-parser.service");
const platform_express_1 = require("@nestjs/platform-express");
const fs = require("fs");
const group_service_1 = require("../group/group.service");
const prisma_service_1 = require("../prisma/prisma.service");
const lesson_service_1 = require("../lesson/lesson.service");
const lesson_order_service_1 = require("../lesson-order/lesson-order.service");
const schedule_service_1 = require("../schedule/schedule.service");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("../auth/auth.service");
const jwt_1 = require("@nestjs/jwt");
try {
    if (!fs.existsSync('./uploads')) {
        fs.mkdirSync('./uploads');
    }
}
catch (err) {
    console.error('Error creating uploads directory:', err);
}
let CsvParserModule = class CsvParserModule {
};
exports.CsvParserModule = CsvParserModule;
exports.CsvParserModule = CsvParserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
        ],
        providers: [
            csv_parser_service_1.CsvParserService,
            group_service_1.GroupService,
            lesson_service_1.LessonService,
            lesson_order_service_1.LessonOrderService,
            schedule_service_1.ScheduleService,
            prisma_service_1.PrismaService,
            user_service_1.UserService,
            auth_service_1.AuthService,
            jwt_1.JwtService,
        ],
        exports: [csv_parser_service_1.CsvParserService],
    })
], CsvParserModule);
//# sourceMappingURL=csv-parser.module.js.map