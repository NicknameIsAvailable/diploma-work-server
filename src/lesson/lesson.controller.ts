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
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Roles } from 'src/role/role.decorator';
import { EUserRole } from 'src/user/dto/create-user.dto';

@ApiTags('Уроки')
@ApiBearerAuth()
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Создать новый урок' })
  @ApiResponse({
    status: 201,
    description: 'Урок успешно создан',
    type: CreateLessonDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 400, description: 'Некорректный запрос' })
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @Post('many')
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Создать несколько уроков' })
  @ApiResponse({
    status: 201,
    description: 'Уроки успешно созданы',
    type: [CreateLessonDto],
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 400, description: 'Некорректный запрос' })
  createMany(@Body() data: CreateLessonDto[]) {
    return this.lessonService.createMany(data);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех уроков' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает список всех уроков',
    type: [CreateLessonDto],
  })
  findAll() {
    return this.lessonService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить урок по ID' })
  @ApiParam({ name: 'id', description: 'ID урока' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает урок',
    type: CreateLessonDto,
  })
  @ApiResponse({ status: 404, description: 'Урок не найден' })
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(id);
  }

  @Patch(':id')
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Обновить урок по ID' })
  @ApiParam({ name: 'id', description: 'ID урока' })
  @ApiResponse({
    status: 200,
    description: 'Урок успешно обновлен',
    type: CreateLessonDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 404, description: 'Урок не найден' })
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.update(id, updateLessonDto);
  }

  @Delete(':id')
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Удалить урок по ID' })
  @ApiParam({ name: 'id', description: 'ID урока' })
  @ApiResponse({ status: 200, description: 'Урок успешно удален' })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 404, description: 'Урок не найден' })
  remove(@Param('id') id: string) {
    return this.lessonService.remove(id);
  }
}
