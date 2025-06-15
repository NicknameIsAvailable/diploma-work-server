import { Module } from '@nestjs/common';
import { CsvParserService } from './csv-parser.service';
import { MulterModule } from '@nestjs/platform-express';
import * as fs from 'fs';
import { GroupService } from 'src/group/group.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LessonService } from 'src/lesson/lesson.service';
import { LessonOrderService } from 'src/lesson-order/lesson-order.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

try {
  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
  }
} catch (err) {
  console.error('Error creating uploads directory:', err);
}

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [
    CsvParserService,
    GroupService,
    LessonService,
    LessonOrderService,
    ScheduleService,
    PrismaService,
    UserService,
    AuthService,
    JwtService,
  ],
  exports: [CsvParserService],
})
export class CsvParserModule {}
