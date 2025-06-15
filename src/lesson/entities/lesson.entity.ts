import { ApiProperty } from '@nestjs/swagger';

export class Lesson {
  @ApiProperty({ description: 'ID записи урока', example: 'uuid-lesson' })
  id: string;

  @ApiProperty({
    description: 'Дата обновления записи',
    example: '2024-12-31T23:59:59.999Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Дата создания записи',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'ID аудиторий, в которых проходит урок',
    type: [String],
    example: ['A101', 'A102'],
  })
  audiences: string[];

  @ApiProperty({ description: 'ID урока', example: 'uuid-lesson-definition' })
  lessonId: string;

  @ApiProperty({
    description: 'ID дня расписания',
    example: 'uuid-schedule-day',
  })
  scheduleDayId: string;

  @ApiProperty({ description: 'ID порядка урока', example: 'uuid-order' })
  orderId: string;
}
