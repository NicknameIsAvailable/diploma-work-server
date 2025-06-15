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
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, EUserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/role/role.decorator';
import { RolesGuard } from 'src/role/role.guard';

@ApiTags('Пользователи')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(EUserRole.ADMIN)
  @UseGuards(RolesGuard)
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
  @UseGuards(RolesGuard)
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
  @ApiOperation({ summary: 'Получить список всех пользователей с фильтрацией' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает список всех пользователей',
    type: [CreateUserDto],
  })
  findAll(@Query() query: Partial<Record<keyof CreateUserDto, string>>) {
    return this.userService.findAll(query);
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
  @UseGuards(RolesGuard)
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
  @UseGuards(RolesGuard)
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

  @Delete('many')
  @Roles(EUserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Удалить нескольких пользователей' })
  @ApiResponse({ status: 200, description: 'Пользователи успешно удалены' })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 400, description: 'Некорректный запрос' })
  removeMany(@Param('userIds') userIds: string[]) {
    return this.userService.removeMany(userIds);
  }
}
