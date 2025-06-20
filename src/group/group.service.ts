import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async create(createGroupDto: CreateGroupDto) {
    const { studentIds, curatorId, specialityId, ...groupData } =
      createGroupDto;

    try {
      return await this.prisma.group.create({
        data: {
          ...groupData,
          curatorId,
          students: {
            connect: studentIds.map((id) => ({ id })),
          },
          schedule: {
            create: {},
          },
          specialityId,
        },
        include: {
          students: true,
          curator: true,
          schedule: true,
        },
      });
    } catch (error) {
      console.error('Group creation error:', error); // Добавьте эту строку
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Group with this number already exists',
          );
        }
        if (error.code === 'P2025') {
          throw new BadRequestException('Invalid curator or student ID');
        }
      }
      throw new InternalServerErrorException('Failed to create group');
    }
  }

  async createMany(createGroupDtos: CreateGroupDto[]) {
    try {
      const numbers = createGroupDtos.map((dto) => dto.number);

      const existingGroups = await this.prisma.group.findMany({
        where: { number: { in: numbers } },
        select: { number: true },
      });
      const existingNumbers = new Set(existingGroups.map((g) => g.number));

      const toCreate = createGroupDtos.filter(
        (dto) => !existingNumbers.has(dto.number),
      );

      if (toCreate.length === 0) return [];

      const createdGroups = await Promise.all(
        toCreate.map(async (dto) => this.create(dto)),
      );
      return createdGroups;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Failed to create multiple groups',
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.group.findMany({
        include: {
          curator: true,
          students: true,
          speciality: true,
        },
      });
    } catch {
      throw new InternalServerErrorException('Failed to retrieve groups');
    }
  }

  async findOne(id: string) {
    try {
      const group = await this.prisma.group.findUnique({
        where: { id },
        include: {
          curator: true,
          students: true,
          speciality: true,
        },
      });
      if (!group) {
        throw new NotFoundException(`Group with ID ${id} not found`);
      }
      return group;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve group');
    }
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const { studentIds, curatorId, specialityId, ...groupData } =
      updateGroupDto;

    try {
      return await this.prisma.group.update({
        where: { id },
        data: {
          ...groupData,
          curator: curatorId
            ? {
                connect: { id: curatorId },
              }
            : undefined,
          students: studentIds
            ? {
                set: studentIds.map((id) => ({ id })),
              }
            : undefined,
          speciality: specialityId
            ? {
                connect: { id: specialityId },
              }
            : undefined,
        },
        include: {
          students: true,
          curator: true,
          schedule: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Group with ID ${id} not found`);
        }
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Group with this number already exists',
          );
        }
      }
      throw new InternalServerErrorException('Failed to update group');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.group.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Group with ID ${id} not found`);
        }
      }
      throw new InternalServerErrorException('Failed to remove group');
    }
  }
}
