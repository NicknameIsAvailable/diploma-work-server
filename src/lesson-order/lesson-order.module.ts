import { Module } from '@nestjs/common';
import { LessonOrderService } from './lesson-order.service';
import { LessonOrderController } from './lesson-order.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LessonOrderController],
  providers: [LessonOrderService, PrismaService],
})
export class LessonOrderModule {}
