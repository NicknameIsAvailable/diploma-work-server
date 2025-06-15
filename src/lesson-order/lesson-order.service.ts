import { Injectable } from '@nestjs/common';
import { CreateLessonOrderDto } from './dto/create-lesson-order.dto';
import { UpdateLessonOrderDto } from './dto/update-lesson-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonOrderService {
  constructor(private prisma: PrismaService) {}

  create(createLessonOrderDto: CreateLessonOrderDto) {
    return this.prisma.lessonOrder.create({ data: createLessonOrderDto });
  }

  async createMany(createLessonOrderDtos: CreateLessonOrderDto[]) {
    const orders = createLessonOrderDtos.map((dto) => dto.order);

    const existingOrders = await this.prisma.lessonOrder.findMany({
      where: { order: { in: orders } },
      select: { order: true },
    });
    const existingOrderSet = new Set(existingOrders.map((o) => o.order));

    const toCreate = createLessonOrderDtos.filter(
      (dto) => !existingOrderSet.has(dto.order),
    );
    if (toCreate.length === 0) return [];

    return this.prisma.lessonOrder.createMany({
      data: toCreate,
      skipDuplicates: true,
    });
  }

  findAll() {
    return this.prisma.lessonOrder.findMany();
  }

  findOne(id: string) {
    return this.prisma.lessonOrder.findUnique({ where: { id } });
  }

  update(id: string, updateLessonOrderDto: UpdateLessonOrderDto) {
    return this.prisma.lessonOrder.update({
      where: { id },
      data: updateLessonOrderDto,
    });
  }

  remove(id: string) {
    return this.prisma.lessonOrder.delete({ where: { id } });
  }
}
