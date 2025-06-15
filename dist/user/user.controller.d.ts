import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
    createMany(createUserDto: CreateUserDto[]): Promise<{
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
    findAll(query: Partial<Record<keyof CreateUserDto, string>>): import("@prisma/client").Prisma.PrismaPromise<({
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
    findOne(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
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
    remove(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
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
    removeMany(userIds: string[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
