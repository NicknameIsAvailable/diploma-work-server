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
import { ScheduleLessonService } from './schedule-lesson.service';
import { CreateScheduleLessonDto } from './dto/create-schedule-lesson.dto';
import { UpdateScheduleLessonDto } from './dto/update-schedule-lesson.dto';
import { Roles } from 'src/role/role.decorator';
import { EUserRole } from 'src/user/dto/create-user.dto';

@ApiTags('Уроки в расписании')
@ApiBearerAuth()
@Controller('schedule-lesson')
export class ScheduleLessonController {
  constructor(private readonly scheduleLessonService: ScheduleLessonService) {}

  @Post()
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Создать новый урок в расписании' })
  @ApiResponse({
    status: 201,
    description: 'Урок в расписании успешно создан',
    type: CreateScheduleLessonDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 400, description: 'Некорректный запрос' })
  create(@Body() createScheduleLessonDto: CreateScheduleLessonDto) {
    return this.scheduleLessonService.create(createScheduleLessonDto);
  }

  @Post('many')
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Создать несколько уроков в расписании' })
  @ApiResponse({
    status: 201,
    description: 'Уроки в расписании успешно созданы',
    type: [CreateScheduleLessonDto],
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 400, description: 'Некорректный запрос' })
  createMany(@Body() createScheduleLessonDto: CreateScheduleLessonDto[]) {
    return this.scheduleLessonService.createMany(createScheduleLessonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех уроков в расписании' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает список всех уроков в расписании',
    type: [CreateScheduleLessonDto],
  })
  findAll() {
    return this.scheduleLessonService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить урок в расписании по ID' })
  @ApiParam({ name: 'id', description: 'ID урока в расписании' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает урок в расписании',
    type: CreateScheduleLessonDto,
  })
  @ApiResponse({ status: 404, description: 'Урок в расписании не найден' })
  findOne(@Param('id') id: string) {
    return this.scheduleLessonService.findOne(id);
  }

  @Patch(':id')
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Обновить урок в расписании по ID' })
  @ApiParam({ name: 'id', description: 'ID урока в расписании' })
  @ApiResponse({
    status: 200,
    description: 'Урок в расписании успешно обновлен',
    type: CreateScheduleLessonDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 404, description: 'Урок в расписании не найден' })
  update(
    @Param('id') id: string,
    @Body() updateScheduleLessonDto: UpdateScheduleLessonDto,
  ) {
    return this.scheduleLessonService.update(id, updateScheduleLessonDto);
  }

  @Delete(':id')
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Удалить урок в расписании по ID' })
  @ApiParam({ name: 'id', description: 'ID урока в расписании' })
  @ApiResponse({ status: 200, description: 'Урок в расписании успешно удален' })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 404, description: 'Урок в расписании не найден' })
  remove(@Param('id') id: string) {
    return this.scheduleLessonService.remove(id);
  }
}
