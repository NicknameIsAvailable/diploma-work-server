import { Module } from '@nestjs/common';
import { ScheduleLessonService } from './schedule-lesson.service';
import { ScheduleLessonController } from './schedule-lesson.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ScheduleLessonController],
  providers: [ScheduleLessonService, PrismaService],
})
export class ScheduleLessonModule {}
