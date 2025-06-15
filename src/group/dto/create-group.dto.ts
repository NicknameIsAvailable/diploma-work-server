import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    description: 'Название группы',
    example: 'Группа A-101',
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
  @IsOptional()
  curatorId?: string;

  @ApiProperty({
    description: 'ID специальности группы',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  specialityId?: string;

  @ApiProperty({
    description: 'Год начала обучения',
    example: 2023,
  })
  @IsInt()
  @Min(2000)
  @IsOptional()
  startYear?: number;

  @ApiProperty({
    description: 'Год окончания обучения',
    example: 2024,
  })
  @IsInt()
  @Min(2000)
  @IsOptional()
  endYear?: number;

  @ApiProperty({
    description: 'Курс группы',
    example: 2,
  })
  @IsInt()
  @Min(1)
  course: number;
}
