import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsUUID } from 'class-validator';

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
    description: 'ID номера урока',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  orderId: string;
}
