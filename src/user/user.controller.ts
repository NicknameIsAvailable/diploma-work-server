import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, EUserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/role/role.decorator';

@ApiTags('Пользователи')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Создать нового пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно создан',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 400, description: 'Некорректный запрос' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('many')
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Создать несколько пользователей' })
  @ApiResponse({
    status: 201,
    description: 'Пользователи успешно созданы',
    type: [CreateUserDto],
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 400, description: 'Некорректный запрос' })
  createMany(@Body() createUserDto: CreateUserDto[]) {
    return this.userService.createMany(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает список всех пользователей',
    type: [CreateUserDto],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiParam({ name: 'id', description: 'ID пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает пользователя',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Обновить пользователя по ID' })
  @ApiParam({ name: 'id', description: 'ID пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно обновлен',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Удалить пользователя по ID' })
  @ApiParam({ name: 'id', description: 'ID пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно удален' })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
