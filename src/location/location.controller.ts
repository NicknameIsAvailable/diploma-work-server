import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { EUserRole } from 'src/user/dto/create-user.dto';
import { Roles } from 'src/role/role.decorator';

@ApiTags('Локации (Площадки)')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @ApiOperation({ summary: 'Создать новую локацию' })
  @ApiResponse({ status: 201, description: 'Локация успешно создана' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Post('many')
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @ApiOperation({ summary: 'Создать несколько локаций' })
  @ApiResponse({ status: 201, description: 'Локации успешно созданы' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  createMany(@Body() createLocationDtos: CreateLocationDto[]) {
    return this.locationService.createMany(createLocationDtos);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех локаций' })
  @ApiResponse({ status: 200, description: 'Список локаций успешно получен' })
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить локацию по ID' })
  @ApiParam({ name: 'id', description: 'ID локации' })
  @ApiResponse({ status: 200, description: 'Локация успешно найдена' })
  @ApiResponse({ status: 404, description: 'Локация не найдена' })
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  @Patch(':id')
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @ApiOperation({ summary: 'Обновить локацию по ID' })
  @ApiParam({ name: 'id', description: 'ID локации' })
  @ApiResponse({ status: 200, description: 'Локация успешно обновлена' })
  @ApiResponse({ status: 404, description: 'Локация не найдена' })
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @Roles(EUserRole.TEACHER, EUserRole.ADMIN)
  @ApiOperation({ summary: 'Удалить локацию по ID' })
  @ApiParam({ name: 'id', description: 'ID локации' })
  @ApiResponse({ status: 200, description: 'Локация успешно удалена' })
  @ApiResponse({ status: 404, description: 'Локация не найдена' })
  remove(@Param('id') id: string) {
    return this.locationService.remove(id);
  }
}
