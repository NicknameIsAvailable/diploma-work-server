import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonOrderDto {
  @ApiProperty({
    description: 'Порядковый номер урока',
    example: 1,
  })
  @IsInt()
  order: number;

  @ApiProperty({
    description: 'Время начала урока в формате HH:mm',
    example: '09:00',
  })
  @IsString()
  startTime: string;

  @ApiProperty({
    description: 'Время окончания урока в формате HH:mm',
    example: '09:45',
  })
  @IsString()
  endTime: string;
}
