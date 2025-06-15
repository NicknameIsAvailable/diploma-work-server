import { Module, forwardRef } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExcelParserService } from 'src/excel-parser/excel-parser.service';
import { CsvParserService } from 'src/csv-parser/csv-parser.service';
import { GroupService } from 'src/group/group.service';
import { LessonOrderService } from 'src/lesson-order/lesson-order.service';
import { LessonService } from 'src/lesson/lesson.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { GroupModule } from 'src/group/group.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => GroupModule),
  ],
  controllers: [ScheduleController],
  providers: [
    PrismaService,
    JwtService,
    ExcelParserService,
    CsvParserService,
    LessonService,
    LessonOrderService,
    ScheduleService,
    GroupService,
  ],
})
export class ScheduleModule {}
