import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsUUID } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    description: 'Название группы',
    example: 'Группа A-101',
  })
  @IsString()
  label: string;

  @ApiProperty({
    description: 'Номер группы',
    example: '101',
  })
  @IsString()
  number: string;

  @ApiProperty({
    description: 'Массив ID студентов в группе',
    type: [String],
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '987fcdeb-51a2-43f7-9876-543210987654',
    ],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  studentIds: string[];

  @ApiProperty({
    description: 'ID куратора группы',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  curatorId: string;

  @ApiProperty({
    description: 'ID расписания группы',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  shceduleId: string;
}
