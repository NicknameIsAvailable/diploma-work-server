import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { groupId, ...userData } = createUserDto;

    return this.prisma.user.create({
      data: {
        ...userData,
        studentGroup: groupId ? { connect: { id: groupId } } : undefined,
      },
      include: {
        studentGroup: true,
        curatedGroups: true,
      },
    });
  }

  async createMany(createUserDtos: CreateUserDto[]) {
    const createdUsers = await Promise.all(
      createUserDtos.map(async (dto) => {
        const { groupId, ...userData } = dto;
        return this.prisma.user.create({
          data: {
            ...userData,
            studentGroup: groupId ? { connect: { id: groupId } } : undefined,
          },
          include: {
            studentGroup: true,
            curatedGroups: true,
          },
        });
      }),
    );

    return createdUsers;
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { groupId, ...userData } = updateUserDto;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        studentGroup: groupId ? { connect: { id: groupId } } : undefined,
      },
      include: {
        studentGroup: true,
        curatedGroups: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
