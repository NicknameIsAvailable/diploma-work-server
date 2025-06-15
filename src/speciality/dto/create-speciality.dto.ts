import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecialityDto {
  @ApiProperty({
    description: 'Название специальности',
    example: 'Инженер-строитель',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Номер специальности',
    example: '12345',
  })
  @IsString()
  number: string;

  @ApiProperty({
    description: 'Код специальности',
    example: 'C123',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Описание специальности',
    example:
      'Специальность, связанная с проектированием и строительством зданий.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'ID площадки',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  locationId: string;
}
