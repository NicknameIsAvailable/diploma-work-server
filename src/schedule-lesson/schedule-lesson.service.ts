import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateScheduleLessonDto } from './dto/create-schedule-lesson.dto';
import { UpdateScheduleLessonDto } from './dto/update-schedule-lesson.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ScheduleLessonService {
  constructor(private prisma: PrismaService) {}

  async create(createScheduleLessonDto: CreateScheduleLessonDto) {
    const { teacherIds, lessonId, ...lessonData } = createScheduleLessonDto;

    try {
      const teachers = await this.prisma.user.findMany({
        where: {
          id: {
            in: teacherIds,
          },
        },
      });

      if (teachers.length !== teacherIds.length) {
        throw new BadRequestException('One or more teacher IDs are invalid');
      }

      return await this.prisma.scheduleLesson.create({
        data: {
          ...lessonData,
          lesson: {
            connect: { id: lessonId },
          },
          teachers: {
            connect: teachers.map((teacher) => ({ id: teacher.id })),
          },
        },
        include: {
          teachers: true,
          lesson: true,
          scheduleDay: true,
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('This schedule lesson already exists');
        }
      }
      throw new InternalServerErrorException(
        'Failed to create schedule lesson',
      );
    }
  }

  async createMany(createScheduleLessonDtos: CreateScheduleLessonDto[]) {
    try {
      const createdLessons = await Promise.all(
        createScheduleLessonDtos.map(async (dto) => this.create(dto)),
      );
      return createdLessons;
    } catch {
      throw new InternalServerErrorException(
        'Failed to create multiple schedule lessons',
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
        where.scheduleDay = {
          schedule: {
            groupId: {
              in: groupIDs,
            },
          },
        };
      }

      if (teacherIDs && teacherIDs.length > 0) {
        where.teachers = {
          some: {
            id: {
              in: teacherIDs,
            },
          },
        };
      }

      if (lessonIDs && lessonIDs.length > 0) {
        where.lessonId = {
          in: lessonIDs,
        };
      }

      return await this.prisma.scheduleLesson.findMany({
        where,
        include: {
          lesson: true,
          scheduleDay: {
            include: {
              schedule: {
                include: {
                  group: true,
                },
              },
            },
          },
          teachers: true,
        },
      });
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new InternalServerErrorException(
        'Failed to retrieve schedule lessons',
      );
    }
  }

  async findOne(id: string) {
    try {
      const scheduleLesson = await this.prisma.scheduleLesson.findUnique({
        where: { id },
        include: {
          lesson: true,
          scheduleDay: true,
        },
      });
      if (!scheduleLesson) {
        throw new NotFoundException(`Schedule lesson with ID ${id} not found`);
      }
      return scheduleLesson;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to retrieve schedule lesson',
      );
    }
  }

  async update(id: string, updateScheduleLessonDto: UpdateScheduleLessonDto) {
    const { teacherIds, ...lessonData } = updateScheduleLessonDto;

    try {
      if (teacherIds) {
        const teachers = await this.prisma.user.findMany({
          where: {
            id: {
              in: teacherIds,
            },
          },
        });

        if (teachers.length !== teacherIds.length) {
          throw new BadRequestException('One or more teacher IDs are invalid');
        }
      }

      return await this.prisma.scheduleLesson.update({
        where: { id },
        data: {
          ...lessonData,
          teachers: teacherIds
            ? {
                set: teacherIds.map((id) => ({ id })),
              }
            : undefined,
        },
        include: {
          teachers: true,
          lesson: true,
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Schedule lesson with ID ${id} not found`,
          );
        }
      }
      throw new InternalServerErrorException(
        'Failed to update schedule lesson',
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.scheduleLesson.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Schedule lesson with ID ${id} not found`,
          );
        }
      }
      throw new InternalServerErrorException(
        'Failed to remove schedule lesson',
      );
    }
  }
}
