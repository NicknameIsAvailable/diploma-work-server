import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        name: string;
        surname: string;
        studentGroupId: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
        passwordHash: string;
        updatedAt: Date | null;
        email: string;
        login: string;
    }>;
    createMany(createUserDto: CreateUserDto[]): Promise<{
        user: {
            id: string;
            name: string;
            surname: string;
            studentGroupId: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            createdAt: Date;
            updatedAt: Date | null;
            email: string;
            login: string;
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
            curator: {
                id: string;
                name: string;
                surname: string;
                studentGroupId: string | null;
                role: import("@prisma/client").$Enums.UserRole;
                createdAt: Date;
                passwordHash: string;
                updatedAt: Date | null;
                email: string;
                login: string;
            };
            speciality: {
                number: string;
                id: string;
                createdAt: Date;
                updatedAt: Date | null;
                title: string;
                code: string;
                description: string | null;
                locationId: string | null;
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
        id: string;
        name: string;
        surname: string;
        studentGroupId: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
        passwordHash: string;
        updatedAt: Date | null;
        email: string;
        login: string;
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
            curator: {
                id: string;
                name: string;
                surname: string;
                studentGroupId: string | null;
                role: import("@prisma/client").$Enums.UserRole;
                createdAt: Date;
                passwordHash: string;
                updatedAt: Date | null;
                email: string;
                login: string;
            };
            speciality: {
                number: string;
                id: string;
                createdAt: Date;
                updatedAt: Date | null;
                title: string;
                code: string;
                description: string | null;
                locationId: string | null;
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
        id: string;
        name: string;
        surname: string;
        studentGroupId: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
        passwordHash: string;
        updatedAt: Date | null;
        email: string;
        login: string;
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
        id: string;
        name: string;
        surname: string;
        studentGroupId: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
        passwordHash: string;
        updatedAt: Date | null;
        email: string;
        login: string;
    }>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        surname: string;
        studentGroupId: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
        passwordHash: string;
        updatedAt: Date | null;
        email: string;
        login: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    removeMany(userIds: string[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
