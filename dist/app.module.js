"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_service_1 = require("./prisma/prisma.service");
const prisma_module_1 = require("./prisma/prisma.module");
const lesson_module_1 = require("./lesson/lesson.module");
const schedule_module_1 = require("./schedule/schedule.module");
const group_module_1 = require("./group/group.module");
const user_module_1 = require("./user/user.module");
const schedule_lesson_module_1 = require("./schedule-lesson/schedule-lesson.module");
const config_1 = require("@nestjs/config");
const lesson_order_module_1 = require("./lesson-order/lesson-order.module");
const speciality_module_1 = require("./speciality/speciality.module");
const auth_module_1 = require("./auth/auth.module");
const location_module_1 = require("./location/location.module");
const excel_parser_service_1 = require("./excel-parser/excel-parser.service");
const csv_parser_module_1 = require("./csv-parser/csv-parser.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("./config/jwt.config");
const core_1 = require("@nestjs/core");
const role_guard_1 = require("./role/role.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: jwt_config_1.getJwtConfig,
                global: true,
            }),
            lesson_module_1.LessonModule,
            schedule_module_1.ScheduleModule,
            group_module_1.GroupModule,
            user_module_1.UserModule,
            schedule_lesson_module_1.ScheduleLessonModule,
            lesson_order_module_1.LessonOrderModule,
            speciality_module_1.SpecialityModule,
            auth_module_1.AuthModule,
            location_module_1.LocationModule,
            csv_parser_module_1.CsvParserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            prisma_service_1.PrismaService,
            excel_parser_service_1.ExcelParserService,
            {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RolesGuard,
            },
        ],
        exports: [jwt_1.JwtModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map