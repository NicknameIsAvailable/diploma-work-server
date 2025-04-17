import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        curatedGroups: {
            number: string;
            label: string;
            id: string;
            curatorId: string;
        }[];
        studentGroup: {
            number: string;
            label: string;
            id: string;
            curatorId: string;
        };
    } & {
        name: string;
        id: string;
        surname: string;
        role: import("@prisma/client").$Enums.UserRole;
        studentGroupId: string | null;
    }>;
    createMany(createUserDto: CreateUserDto[]): Promise<({
        curatedGroups: {
            number: string;
            label: string;
            id: string;
            curatorId: string;
        }[];
        studentGroup: {
            number: string;
            label: string;
            id: string;
            curatorId: string;
        };
    } & {
        name: string;
        id: string;
        surname: string;
        role: import("@prisma/client").$Enums.UserRole;
        studentGroupId: string | null;
    })[]>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        surname: string;
        role: import("@prisma/client").$Enums.UserRole;
        studentGroupId: string | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        id: string;
        surname: string;
        role: import("@prisma/client").$Enums.UserRole;
        studentGroupId: string | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        curatedGroups: {
            number: string;
            label: string;
            id: string;
            curatorId: string;
        }[];
        studentGroup: {
            number: string;
            label: string;
            id: string;
            curatorId: string;
        };
    } & {
        name: string;
        id: string;
        surname: string;
        role: import("@prisma/client").$Enums.UserRole;
        studentGroupId: string | null;
    }>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        id: string;
        surname: string;
        role: import("@prisma/client").$Enums.UserRole;
        studentGroupId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
