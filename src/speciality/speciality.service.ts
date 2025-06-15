import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';

@Injectable()
export class SpecialityService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSpecialityDto: CreateSpecialityDto) {
    return this.prisma.speciality.create({ data: createSpecialityDto });
  }

  findAll() {
    return this.prisma.speciality.findMany({
      include: {
        groups: true,
        location: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.speciality.findUnique({
      where: { id },
      include: {
        groups: true,
        location: true,
      },
    });
  }

  update(id: string, updateSpecialityDto: UpdateSpecialityDto) {
    return this.prisma.speciality.update({
      where: { id },
      data: updateSpecialityDto,
      include: {
        groups: true,
        location: true,
      },
    });
  }

  async createMany(createSpecialityDtos: CreateSpecialityDto[]) {
    return this.prisma.speciality.createMany({
      data: createSpecialityDtos,
      skipDuplicates: true,
    });
  }

  remove(id: string) {
    return this.prisma.speciality.delete({
      where: { id },
      include: {
        groups: true,
        location: true,
      },
    });
  }
}
