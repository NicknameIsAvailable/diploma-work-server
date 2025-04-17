import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsUUID, IsNumber, Min, Max } from 'class-validator';

export enum DayEnum {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

export class ScheduleLessonDto {
  @ApiProperty({
    description: 'Уникальный идентификатор урока',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  lessonId: string;

  @ApiProperty({
    description: 'Порядковый номер урока (от 0 до 7)',
    minimum: 0,
    maximum: 7,
    example: 1,
  })
  @IsNumber()
  @Min(0)
  @Max(7)
  order: number;

  @ApiProperty({
    description: 'Массив ID аудиторий (от 1 до 2 элементов)',
    type: [String],
    example: ['A101', 'A102'],
  })
  @IsArray()
  @Max(2)
  @Min(1)
  audiences: string[];

  @ApiProperty({
    description: 'Массив ID преподавателей (от 1 до 2 элементов)',
    type: [String],
    example: ['123e4567-e89b-12d3-a456-426614174000'],
  })
  @IsArray()
  @Max(2)
  @Min(1)
  teacherIds: string[];
}

export class ScheduleDayDto {
  @ApiProperty({
    enum: DayEnum,
    description: 'День недели',
    example: DayEnum.MONDAY,
    enumName: 'День недели',
  })
  @IsEnum(DayEnum)
  day: DayEnum;

  @ApiProperty({
    type: [ScheduleLessonDto],
    description: 'Массив уроков (от 2 до 8 уроков)',
  })
  @IsArray()
  @Min(2)
  @Max(8)
  lessons: ScheduleLessonDto[];
}

export class CreateScheduleDto {
  @ApiProperty({
    description: 'ID группы',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  groupId: string;

  @ApiProperty({
    type: [ScheduleDayDto],
    description: 'Расписание на неделю',
  })
  @IsArray()
  week: ScheduleDayDto[];
}
