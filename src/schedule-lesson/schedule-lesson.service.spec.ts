import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleLessonService } from './schedule-lesson.service';

describe('ScheduleLessonService', () => {
  let service: ScheduleLessonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleLessonService],
    }).compile();

    service = module.get<ScheduleLessonService>(ScheduleLessonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
