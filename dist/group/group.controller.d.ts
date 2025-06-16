import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    create(createGroupDto: CreateGroupDto): Promise<{
        schedule: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            groupId: string;
        };
        curator: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            name: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            passwordHash: string;
            email: string;
            login: string;
            studentGroupId: string | null;
        };
        students: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            name: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            passwordHash: string;
            email: string;
            login: string;
            studentGroupId: string | null;
        }[];
    } & {
        number: string;
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        curatorId: string | null;
        endYear: number | null;
        specialityId: string | null;
        startYear: number | null;
        course: number;
    }>;
    createMany(createGroupDto: CreateGroupDto[]): Promise<({
        schedule: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            groupId: string;
        };
        curator: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            name: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            passwordHash: string;
            email: string;
            login: string;
            studentGroupId: string | null;
        };
        students: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            name: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            passwordHash: string;
            email: string;
            login: string;
            studentGroupId: string | null;
        }[];
    } & {
        number: string;
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        curatorId: string | null;
        endYear: number | null;
        specialityId: string | null;
        startYear: number | null;
        course: number;
    })[]>;
    findAll(): Promise<({
        curator: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            name: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            passwordHash: string;
            email: string;
            login: string;
            studentGroupId: string | null;
        };
        speciality: {
            number: string;
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            title: string;
            code: string;
            description: string | null;
            locationId: string | null;
        };
        students: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            name: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            passwordHash: string;
            email: string;
            login: string;
            studentGroupId: string | null;
        }[];
    } & {
        number: string;
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        curatorId: string | null;
        endYear: number | null;
        specialityId: string | null;
        startYear: number | null;
        course: number;
    })[]>;
    findOne(id: string): Promise<{
        curator: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            name: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            passwordHash: string;
            email: string;
            login: string;
            studentGroupId: string | null;
        };
        speciality: {
            number: string;
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            title: string;
            code: string;
            description: string | null;
            locationId: string | null;
        };
        students: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            name: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            passwordHash: string;
            email: string;
            login: string;
            studentGroupId: string | null;
        }[];
    } & {
        number: string;
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        curatorId: string | null;
        endYear: number | null;
        specialityId: string | null;
        startYear: number | null;
        course: number;
    }>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<{
        schedule: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            groupId: string;
        };
        curator: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            name: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            passwordHash: string;
            email: string;
            login: string;
            studentGroupId: string | null;
        };
        students: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            name: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            passwordHash: string;
            email: string;
            login: string;
            studentGroupId: string | null;
        }[];
    } & {
        number: string;
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        curatorId: string | null;
        endYear: number | null;
        specialityId: string | null;
        startYear: number | null;
        course: number;
    }>;
    remove(id: string): Promise<{
        number: string;
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        curatorId: string | null;
        endYear: number | null;
        specialityId: string | null;
        startYear: number | null;
        course: number;
    }>;
}
