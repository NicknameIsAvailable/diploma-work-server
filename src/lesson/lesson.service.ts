import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async create(createLessonDto: CreateLessonDto) {
    try {
      return await this.prisma.lesson.create({
        data: createLessonDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Lesson with this label already exists',
          );
        }
      }
      throw new InternalServerErrorException('Failed to create lesson');
    }
  }

  async createMany(data: CreateLessonDto[]) {
    try {
      const labels = data.map((dto) => dto.label);

      const existingLessons = await this.prisma.lesson.findMany({
        where: { label: { in: labels } },
        select: { label: true },
      });
      const existingLabels = new Set(existingLessons.map((l) => l.label));

      const toCreate = data.filter((dto) => !existingLabels.has(dto.label));

      if (toCreate.length === 0) return [];

      const createdLessons = await Promise.all(
        toCreate.map((dto) => this.create(dto)),
      );
      return createdLessons;
    } catch {
      throw new InternalServerErrorException(
        'Failed to create multiple lessons',
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.lesson.findMany({});
    } catch {
      throw new InternalServerErrorException('Failed to retrieve lessons');
    }
  }

  async findOne(id: string) {
    try {
      const lesson = await this.prisma.lesson.findUnique({
        where: { id },
      });
      if (!lesson) {
        throw new NotFoundException(`Lesson with ID ${id} not found`);
      }
      return lesson;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve lesson');
    }
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    try {
      return await this.prisma.lesson.update({
        where: { id },
        data: updateLessonDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Lesson with ID ${id} not found`);
        }
      }
      throw new InternalServerErrorException('Failed to update lesson');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.lesson.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Lesson not found');
      }
      throw new InternalServerErrorException('Failed to remove lesson');
    }
  }
}
