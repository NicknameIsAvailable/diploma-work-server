import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { Prisma } from '@prisma/client';
export declare class UserService {
    private prisma;
    private readonly authService;
    constructor(prisma: PrismaService, authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        surname: string;
        login: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        studentGroupId: string | null;
        passwordHash: string;
    }>;
    createMany(createUserDtos: CreateUserDto[]): Promise<{
        user: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            surname: string;
            login: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
        };
        accessToken: string;
        refreshToken: string;
    }[]>;
    findAll(query: Partial<Record<keyof Prisma.UserWhereInput, any>>): Prisma.PrismaPromise<({
        curatedGroups: {
            number: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            curatorId: string | null;
            endYear: number | null;
            specialityId: string | null;
            startYear: number | null;
            course: number;
        }[];
        studentGroup: {
            speciality: {
                number: string;
                description: string | null;
                title: string;
                id: string;
                createdAt: Date;
                updatedAt: Date | null;
                code: string;
                locationId: string | null;
            };
            curator: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date | null;
                surname: string;
                login: string;
                email: string;
                role: import("@prisma/client").$Enums.UserRole;
                studentGroupId: string | null;
                passwordHash: string;
            };
        } & {
            number: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            curatorId: string | null;
            endYear: number | null;
            specialityId: string | null;
            startYear: number | null;
            course: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        surname: string;
        login: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        studentGroupId: string | null;
        passwordHash: string;
    })[]>;
    findOne(id: string): Prisma.Prisma__UserClient<{
        curatedGroups: {
            number: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            curatorId: string | null;
            endYear: number | null;
            specialityId: string | null;
            startYear: number | null;
            course: number;
        }[];
        studentGroup: {
            speciality: {
                number: string;
                description: string | null;
                title: string;
                id: string;
                createdAt: Date;
                updatedAt: Date | null;
                code: string;
                locationId: string | null;
            };
            curator: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date | null;
                surname: string;
                login: string;
                email: string;
                role: import("@prisma/client").$Enums.UserRole;
                studentGroupId: string | null;
                passwordHash: string;
            };
        } & {
            number: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            curatorId: string | null;
            endYear: number | null;
            specialityId: string | null;
            startYear: number | null;
            course: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        surname: string;
        login: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        studentGroupId: string | null;
        passwordHash: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findByLogin(login: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        surname: string;
        login: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        studentGroupId: string | null;
        passwordHash: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        curatedGroups: {
            number: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            curatorId: string | null;
            endYear: number | null;
            specialityId: string | null;
            startYear: number | null;
            course: number;
        }[];
        studentGroup: {
            number: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            curatorId: string | null;
            endYear: number | null;
            specialityId: string | null;
            startYear: number | null;
            course: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        surname: string;
        login: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        studentGroupId: string | null;
        passwordHash: string;
    }>;
    remove(id: string): Prisma.Prisma__UserClient<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        surname: string;
        login: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        studentGroupId: string | null;
        passwordHash: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    removeMany(userIds: string[]): Promise<Prisma.BatchPayload>;
}
