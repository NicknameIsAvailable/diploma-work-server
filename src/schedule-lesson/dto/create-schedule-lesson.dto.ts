import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateScheduleLessonDto {
  @ApiProperty({
    description: 'ID урока',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  lessonId: string;

  @ApiProperty({
    description: 'Список аудиторий',
    example: ['А-101', 'Б-202'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  audiences: string[];

  @ApiProperty({
    description: 'Список ID преподавателей',
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '987fcdeb-51a2-43f7-9876-543210987654',
    ],
    type: [String],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  teacherIds: string[];

  @ApiProperty({
    description: 'Порядковый номер урока (от 0 до 10)',
    example: 1,
    minimum: 0,
    maximum: 10,
  })
  @IsInt()
  @Min(0)
  @Max(10)
  order: number;
}
