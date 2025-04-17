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
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Roles } from 'src/role/role.decorator';
import { EUserRole } from 'src/user/dto/create-user.dto';

@ApiTags('Группы')
@ApiBearerAuth()
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Создать новую группу' })
  @ApiResponse({
    status: 201,
    description: 'Группа успешно создана',
    type: CreateGroupDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 400, description: 'Некорректный запрос' })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Post('many')
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Создать несколько групп' })
  @ApiResponse({
    status: 201,
    description: 'Группы успешно созданы',
    type: [CreateGroupDto],
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 400, description: 'Некорректный запрос' })
  createMany(@Body() createGroupDto: CreateGroupDto[]) {
    return this.groupService.createMany(createGroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех групп' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает список всех групп',
    type: [CreateGroupDto],
  })
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить группу по ID' })
  @ApiParam({ name: 'id', description: 'ID группы' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает группу',
    type: CreateGroupDto,
  })
  @ApiResponse({ status: 404, description: 'Группа не найдена' })
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(id);
  }

  @Patch(':id')
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Обновить группу по ID' })
  @ApiParam({ name: 'id', description: 'ID группы' })
  @ApiResponse({
    status: 200,
    description: 'Группа успешно обновлена',
    type: CreateGroupDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 404, description: 'Группа не найдена' })
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  @Roles(EUserRole.ADMIN)
  @ApiOperation({ summary: 'Удалить группу по ID' })
  @ApiParam({ name: 'id', description: 'ID группы' })
  @ApiResponse({ status: 200, description: 'Группа успешно удалена' })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен. Требуются права администратора',
  })
  @ApiResponse({ status: 404, description: 'Группа не найдена' })
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }
}
