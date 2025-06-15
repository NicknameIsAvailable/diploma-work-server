import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { from, map, mergeMap, toArray } from 'rxjs';
import { hash } from 'argon2';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const {
      name,
      surname,
      login,
      email,
      password,
      repeatPassword,
      groupId,
      role,
    } = createUserDto;

    if (password !== repeatPassword) {
      throw new Error('Passwords do not match');
    }

    if (groupId) {
      const groupExists = await this.prisma.group.findUnique({
        where: { id: groupId },
      });

      if (!groupExists) {
        throw new Error(`Group with ID ${groupId} does not exist`);
      }
    }

    return await this.prisma.user.create({
      data: {
        name,
        surname,
        login,
        email,
        role,
        passwordHash: await hash(password),
        studentGroup: groupId ? { connect: { id: groupId } } : undefined, // Связываем группу через connect
      },
    });
  }

  async createMany(createUserDtos: CreateUserDto[]) {
    return from(createUserDtos)
      .pipe(
        mergeMap((dto) =>
          from(this.authService.register(dto)).pipe(
            map((createdUser) => {
              return createdUser;
            }),
          ),
        ),
        toArray(),
      )
      .toPromise();
  }

  findAll(query: Partial<Record<keyof Prisma.UserWhereInput, any>>) {
    return this.prisma.user.findMany({
      where: {
        ...query,
      },
      include: {
        studentGroup: {
          include: {
            curator: true,
            speciality: true,
          },
        },
        curatedGroups: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        studentGroup: {
          include: {
            curator: true,
            speciality: true,
          },
        },
        curatedGroups: true,
      },
    });
  }

  async findByLogin(login: string) {
    return this.prisma.user.findUnique({
      where: { login },
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

  async removeMany(userIds: string[]) {
    return this.prisma.user.deleteMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });
  }
}
