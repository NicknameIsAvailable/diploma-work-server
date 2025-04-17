import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateScheduleDto, ScheduleDayDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const { groupId, week } = createScheduleDto;

    if (!week || week.length === 0) {
      throw new BadRequestException('Week data is required');
    }

    try {
      const group = await this.prisma.group.findUnique({
        where: { id: groupId },
      });

      if (!group) {
        throw new NotFoundException(`Group with ID ${groupId} not found`);
      }

      const existingSchedule = await this.prisma.schedule.findUnique({
        where: { groupId },
      });

      if (existingSchedule) {
        throw new ConflictException(
          `Schedule for group ${groupId} already exists`,
        );
      }

      return await this.prisma.schedule.create({
        data: {
          group: {
            connect: { id: groupId },
          },
          days: {
            create: this.createDaysData(week),
          },
        },
        include: this.getScheduleInclude(),
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Schedule already exists for this group');
        }
      }
      throw new InternalServerErrorException(
        'Failed to create schedule',
        error,
      );
    }
  }

  async createMany(createScheduleDtos: CreateScheduleDto[]) {
    try {
      const createdSchedules = await Promise.all(
        createScheduleDtos.map(async (dto) => this.create(dto)),
      );
      return createdSchedules;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Failed to create multiple schedules',
      );
    }
  }

  async findAll(
    groupIDs?: string[],
    teacherIDs?: string[],
    lessonIDs?: string[],
  ) {
    try {
      const where: any = {};

      if (groupIDs && groupIDs.length > 0) {
        where.groupId = {
          in: groupIDs,
        };
      }

      if (teacherIDs && teacherIDs.length > 0) {
        where.days = {
          some: {
            lessons: {
              some: {
                teachers: {
                  some: {
                    id: {
                      in: teacherIDs,
                    },
                  },
                },
              },
            },
          },
        };
      }

      if (lessonIDs && lessonIDs.length > 0) {
        where.days = {
          some: {
            lessons: {
              some: {
                lessonId: {
                  in: lessonIDs,
                },
              },
            },
          },
        };
      }

      return await this.prisma.schedule.findMany({
        where,
        include: this.getScheduleInclude(),
      });
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new InternalServerErrorException('Failed to retrieve schedules');
    }
  }

  async findOne(id: string) {
    try {
      const schedule = await this.prisma.schedule.findUnique({
        where: { id },
        include: this.getScheduleInclude(),
      });

      if (!schedule) {
        throw new NotFoundException(`Schedule with ID ${id} not found`);
      }

      return schedule;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve schedule');
    }
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    const { groupId, week } = updateScheduleDto;

    try {
      const existingSchedule = await this.prisma.schedule.findUnique({
        where: { id },
      });

      if (!existingSchedule) {
        throw new NotFoundException(`Schedule with ID ${id} not found`);
      }

      await this.prisma.scheduleDay.deleteMany({
        where: { scheduleId: id },
      });

      return await this.prisma.schedule.update({
        where: { id },
        data: {
          group: groupId ? { connect: { id: groupId } } : undefined,
          days: {
            create: this.createDaysData(week),
          },
        },
        include: this.getScheduleInclude(),
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Schedule with ID ${id} not found`);
        }
      }
      throw new InternalServerErrorException('Failed to update schedule');
    }
  }

  async remove(id: string) {
    try {
      const existingSchedule = await this.prisma.schedule.findUnique({
        where: { id },
      });

      if (!existingSchedule) {
        throw new NotFoundException(`Schedule with ID ${id} not found`);
      }

      await this.prisma.scheduleDay.deleteMany({
        where: { scheduleId: id },
      });

      return await this.prisma.schedule.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Schedule with ID ${id} not found`);
        }
      }
      throw new InternalServerErrorException('Failed to remove schedule');
    }
  }

  private createDaysData(week: ScheduleDayDto[]) {
    try {
      return week.map((day) => ({
        day: day.day,
        lessons: {
          create: day.lessons.map((lesson) => ({
            order: lesson.order,
            audiences: lesson.audiences,
            lesson: {
              connect: { id: lesson.lessonId },
            },
            teachers: {
              connect: lesson.teacherIds.map((id) => ({ id })),
            },
          })),
        },
      }));
    } catch {
      throw new BadRequestException('Invalid week data structure');
    }
  }

  private getScheduleInclude(): Prisma.ScheduleInclude {
    return {
      days: {
        include: {
          lessons: {
            include: {
              lesson: true,
              teachers: true,
            },
            orderBy: {
              order: 'asc',
            },
          },
        },
        orderBy: {
          day: 'asc',
        },
      },
      group: true,
    };
  }
}
