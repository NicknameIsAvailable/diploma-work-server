import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'Логин пользователя',
    example: 'username',
  })
  login: string;

  @ApiProperty({
    description: 'Пароль пользователя (от 6 до 120 символов)',
    minLength: 6,
    maxLength: 120,
    example: 'strongpassword123',
  })
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @MaxLength(120, {
    message: 'Password max length is 120 characters',
  })
  @IsString()
  password: string;
}
