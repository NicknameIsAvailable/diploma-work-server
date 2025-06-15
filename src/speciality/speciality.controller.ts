import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
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
import { SpecialityService } from './speciality.service';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { Roles } from 'src/role/role.decorator';
import { EUserRole } from 'src/user/dto/create-user.dto';

@ApiTags('Специальности')
@Controller('speciality')
export class SpecialityController {
  constructor(private readonly specialityService: SpecialityService) {}

  @Post()
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @ApiOperation({ summary: 'Создать новую специальность' })
  @ApiBody({ type: CreateSpecialityDto })
  @ApiResponse({
    status: 201,
    description: 'Специальность успешно создана',
    type: CreateSpecialityDto,
  })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(
    @Body() createSpecialityDto: CreateSpecialityDto,
  ): Promise<CreateSpecialityDto> | any {
    return this.specialityService.create(createSpecialityDto);
  }

  @Post('many')
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @ApiOperation({ summary: 'Создать несколько специальностей' })
  @ApiResponse({ status: 201, description: 'Специальности успешно созданы' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  createMany(@Body() createSpecialityDtos: CreateSpecialityDto[]) {
    return this.specialityService.createMany(createSpecialityDtos);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех специальностей' })
  @ApiResponse({
    status: 200,
    description: 'Список успешно получен',
    type: CreateSpecialityDto,
    isArray: true,
  })
  findAll(): Promise<CreateSpecialityDto[]> | any {
    return this.specialityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить специальность по ID' })
  @ApiParam({ name: 'id', description: 'ID специальности' })
  @ApiResponse({
    status: 200,
    description: 'Специальность найдена',
    type: CreateSpecialityDto,
  })
  @ApiResponse({ status: 404, description: 'Специальность не найдена' })
  findOne(@Param('id') id: string): Promise<CreateSpecialityDto> | any {
    return this.specialityService.findOne(id);
  }

  @Patch(':id')
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @ApiOperation({ summary: 'Обновить специальность по ID' })
  @ApiParam({ name: 'id', description: 'ID специальности' })
  @ApiBody({ type: UpdateSpecialityDto })
  @ApiResponse({
    status: 200,
    description: 'Специальность успешно обновлена',
    type: CreateSpecialityDto,
  })
  @ApiResponse({ status: 404, description: 'Специальность не найдена' })
  update(
    @Param('id') id: string,
    @Body() updateSpecialityDto: UpdateSpecialityDto,
  ): Promise<CreateSpecialityDto> | any {
    return this.specialityService.update(id, updateSpecialityDto);
  }

  @Delete(':id')
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @ApiOperation({ summary: 'Удалить специальность по ID' })
  @ApiParam({ name: 'id', description: 'ID специальности' })
  @ApiResponse({ status: 200, description: 'Специальность успешно удалена' })
  @ApiResponse({ status: 404, description: 'Специальность не найдена' })
  remove(@Param('id') id: string): Promise<any> {
    return this.specialityService.remove(id);
  }
}
