import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleLessonDto } from './create-schedule-lesson.dto';

export class UpdateScheduleLessonDto extends PartialType(CreateScheduleLessonDto) {}
