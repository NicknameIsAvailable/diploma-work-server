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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    LessonModule,
    ScheduleModule,
    GroupModule,
    UserModule,
    ScheduleLessonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
