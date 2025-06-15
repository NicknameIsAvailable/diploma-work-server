import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { LessonOrderService } from './lesson-order.service';
import { CreateLessonOrderDto } from './dto/create-lesson-order.dto';
import { UpdateLessonOrderDto } from './dto/update-lesson-order.dto';
import { Roles } from 'src/role/role.decorator';
import { EUserRole } from 'src/user/dto/create-user.dto';

@ApiTags('Очередь уроков')
@Controller('lesson-order')
export class LessonOrderController {
  constructor(private readonly lessonOrderService: LessonOrderService) {}

  @Post()
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @ApiOperation({ summary: 'Создать новый порядок уроков' })
  @ApiBody({ type: CreateLessonOrderDto })
  @ApiResponse({
    status: 201,
    description: 'Порядок уроков успешно создан.',
    type: CreateLessonOrderDto,
  })
  @ApiResponse({ status: 400, description: 'Некорректные данные.' })
  create(@Body() createLessonOrderDto: CreateLessonOrderDto) {
    return this.lessonOrderService.create(createLessonOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех порядков уроков' })
  @ApiResponse({
    status: 200,
    description: 'Список успешно получен.',
    type: CreateLessonOrderDto,
    isArray: true,
  })
  findAll() {
    return this.lessonOrderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить порядок уроков по ID' })
  @ApiParam({ name: 'id', description: 'ID порядка уроков' })
  @ApiResponse({
    status: 200,
    description: 'Порядок уроков найден.',
    type: CreateLessonOrderDto,
  })
  @ApiResponse({ status: 404, description: 'Порядок уроков не найден.' })
  findOne(@Param('id') id: string) {
    return this.lessonOrderService.findOne(id);
  }

  @Put(':id')
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @ApiOperation({ summary: 'Обновить порядок уроков по ID' })
  @ApiParam({ name: 'id', description: 'ID порядка уроков' })
  @ApiBody({ type: UpdateLessonOrderDto })
  @ApiResponse({
    status: 200,
    description: 'Порядок уроков успешно обновлен.',
    type: CreateLessonOrderDto,
  })
  @ApiResponse({ status: 404, description: 'Порядок уроков не найден.' })
  update(
    @Param('id') id: string,
    @Body() updateLessonOrderDto: UpdateLessonOrderDto,
  ) {
    return this.lessonOrderService.update(id, updateLessonOrderDto);
  }

  @Delete(':id')
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @ApiOperation({ summary: 'Удалить порядок уроков по ID' })
  @ApiParam({ name: 'id', description: 'ID порядка уроков' })
  @ApiResponse({ status: 200, description: 'Порядок уроков успешно удален.' })
  @ApiResponse({ status: 404, description: 'Порядок уроков не найден.' })
  remove(@Param('id') id: string) {
    return this.lessonOrderService.remove(id);
  }
}
