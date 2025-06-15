import { PartialType } from '@nestjs/swagger';
import { CreateLessonOrderDto } from './create-lesson-order.dto';

export class UpdateLessonOrderDto extends PartialType(CreateLessonOrderDto) {}
