import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({
    description: 'Название урока',
    example: 'Математика',
    minLength: 0,
    maxLength: 300,
  })
  @IsString()
  @MinLength(0)
  @MaxLength(300)
  label: string;

  @ApiProperty({
    description: 'Описание урока',
    example: 'Изучение основ алгебры и геометрии',
    required: false,
    maxLength: 1000,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description: string;
}
