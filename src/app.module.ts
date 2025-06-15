import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { LessonModule } from './lesson/lesson.module';
import { ScheduleModule } from './schedule/schedule.module';
import { GroupModule } from './group/group.module';
import { UserModule } from './user/user.module';
import { ScheduleLessonModule } from './schedule-lesson/schedule-lesson.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LessonOrderModule } from './lesson-order/lesson-order.module';
import { SpecialityModule } from './speciality/speciality.module';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './location/location.module';
import { ExcelParserService } from './excel-parser/excel-parser.service';
import { CsvParserModule } from './csv-parser/csv-parser.module';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from './config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './role/role.guard';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
      global: true,
    }),
    LessonModule,
    ScheduleModule,
    GroupModule,
    UserModule,
    ScheduleLessonModule,
    LessonOrderModule,
    SpecialityModule,
    AuthModule,
    LocationModule,
    CsvParserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    ExcelParserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [JwtModule],
})
export class AppModule {}
