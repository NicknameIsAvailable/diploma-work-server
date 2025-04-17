import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
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
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Roles } from 'src/role/role.decorator';
import { EUserRole } from 'src/user/dto/create-user.dto';

@ApiTags('Расписание')
@ApiBearerAuth()
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Создать новое расписание' })
  @ApiResponse({
    status: 201,
    description: 'Расписание успешно создано',
    type: CreateScheduleDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 400, description: 'Некорректный запрос' })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Post('many')
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Создать несколько расписаний' })
  @ApiResponse({
    status: 201,
    description: 'Расписания успешно созданы',
    type: [CreateScheduleDto],
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 400, description: 'Некорректный запрос' })
  createMany(@Body() createScheduleDto: CreateScheduleDto[]) {
    return this.scheduleService.createMany(createScheduleDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Получить все расписания с возможностью фильтрации',
  })
  @ApiQuery({
    name: 'groupIDs',
    required: false,
    description: 'ID групп через запятую',
    type: String,
  })
  @ApiQuery({
    name: 'teacherIDs',
    required: false,
    description: 'ID преподавателей через запятую',
    type: String,
  })
  @ApiQuery({
    name: 'lessonIDs',
    required: false,
    description: 'ID уроков через запятую',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Возвращает список расписаний',
    type: [CreateScheduleDto],
  })
  findAll(
    @Query('groupIDs') groupIDs?: string,
    @Query('teacherIDs') teacherIDs?: string,
    @Query('lessonIDs') lessonIDs?: string,
  ) {
    const groupIDsArray = groupIDs ? groupIDs.split(',') : undefined;
    const teacherIDsArray = teacherIDs ? teacherIDs.split(',') : undefined;
    const lessonIDsArray = lessonIDs ? lessonIDs.split(',') : undefined;

    return this.scheduleService.findAll(
      groupIDsArray,
      teacherIDsArray,
      lessonIDsArray,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить расписание по ID' })
  @ApiParam({ name: 'id', description: 'ID расписания' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает расписание',
    type: CreateScheduleDto,
  })
  @ApiResponse({ status: 404, description: 'Расписание не найдено' })
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(id);
  }

  @Patch(':id')
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Обновить расписание по ID' })
  @ApiParam({ name: 'id', description: 'ID расписания' })
  @ApiResponse({
    status: 200,
    description: 'Расписание успешно обновлено',
    type: CreateScheduleDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 404, description: 'Расписание не найдено' })
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Удалить расписание по ID' })
  @ApiParam({ name: 'id', description: 'ID расписания' })
  @ApiResponse({ status: 200, description: 'Расписание успешно удалено' })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 404, description: 'Расписание не найдено' })
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(id);
  }
}
