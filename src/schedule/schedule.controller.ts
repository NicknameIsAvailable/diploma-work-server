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
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Roles } from 'src/role/role.decorator';
import { EUserRole } from 'src/user/dto/create-user.dto';
import { ExcelParserService } from 'src/excel-parser/excel-parser.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { File as MulterFile } from 'multer';
import {
  CsvParserService,
  ParsedScheduleData,
} from 'src/csv-parser/csv-parser.service';
import { RolesGuard } from 'src/role/role.guard';

@ApiTags('Расписание')
@ApiBearerAuth()
@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly excelParserService: ExcelParserService,
    private readonly csvParserService: CsvParserService,
  ) {}

  @Post()
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @UseGuards(RolesGuard)
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

  @Post('parse')
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Парсинг Excel-файла в CSV' })
  @ApiResponse({
    status: 201,
    description: 'Файл успешно распаршен',
    type: String,
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 400, description: 'Некорректный файл' })
  parseSchedule(@UploadedFile() file: MulterFile): Promise<ParsedScheduleData> {
    const csv = this.csvParserService.parseScheduleCSV(file.buffer);
    return csv;
  }

  @Post('many')
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @UseGuards(RolesGuard)
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
  findAll(@Query('groupIDs') groupIDs?: string) {
    const groupIDsArray = groupIDs ? groupIDs.split(',') : undefined;

    return this.scheduleService.findAll(groupIDsArray);
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
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @UseGuards(RolesGuard)
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
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @UseGuards(RolesGuard)
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
