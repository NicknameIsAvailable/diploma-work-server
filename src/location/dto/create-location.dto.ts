import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({
    example: 'Колледж Метростроя',
    description: 'Название локации',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Ул. Демьяна Бедного д.29',
    description: 'Адрес локации',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'MC123',
    description: 'Код локации',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 'Демьяна Бедного 29',
    description: 'Описание локации',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
