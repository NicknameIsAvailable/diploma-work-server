import { Lesson } from './entities/lesson.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Roles } from 'src/role/role.decorator';
import { EUserRole } from 'src/user/dto/create-user.dto';
import { RolesGuard } from 'src/role/role.guard';

@ApiTags('Уроки')
@ApiBearerAuth()
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Создать новый урок' })
  @ApiBody({ type: CreateLessonDto })
  @ApiResponse({
    status: 201,
    description: 'Урок успешно создан',
    type: Lesson,
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
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Создать несколько уроков' })
  @ApiBody({ type: CreateLessonDto, isArray: true })
  @ApiResponse({
    status: 201,
    description: 'Уроки успешно созданы',
    type: Lesson,
    isArray: true,
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
    type: Lesson,
    isArray: true,
  })
  findAll() {
    return this.lessonService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить урок по ID' })
  @ApiParam({ name: 'id', description: 'ID урока' })
  @ApiResponse({ status: 200, description: 'Возвращает урок', type: Lesson })
  @ApiResponse({ status: 404, description: 'Урок не найден' })
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(id);
  }

  @Patch(':id')
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Обновить урок по ID' })
  @ApiParam({ name: 'id', description: 'ID урока' })
  @ApiBody({ type: UpdateLessonDto })
  @ApiResponse({
    status: 200,
    description: 'Урок успешно обновлен',
    type: Lesson,
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
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @UseGuards(RolesGuard)
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
