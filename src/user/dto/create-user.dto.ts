import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID } from 'class-validator';

export enum EUserRole {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Фамилия пользователя',
    example: 'Иванов',
  })
  @IsString()
  surname: string;

  @ApiProperty({
    description: 'ID группы пользователя',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  groupId: string;

  @ApiProperty({
    description: 'Роль пользователя',
    enum: EUserRole,
    example: EUserRole.STUDENT,
    enumName: 'Роль пользователя',
  })
  @IsEnum(EUserRole)
  role: EUserRole;
}
