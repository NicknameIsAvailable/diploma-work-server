import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleLessonController } from './schedule-lesson.controller';
import { ScheduleLessonService } from './schedule-lesson.service';

describe('ScheduleLessonController', () => {
  let controller: ScheduleLessonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleLessonController],
      providers: [ScheduleLessonService],
    }).compile();

    controller = module.get<ScheduleLessonController>(ScheduleLessonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
