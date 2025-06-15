import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    create(createGroupDto: CreateGroupDto): Promise<{
        schedule: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            groupId: string;
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
        students: {
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
        }[];
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
    }>;
    createMany(createGroupDto: CreateGroupDto[]): Promise<({
        schedule: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            groupId: string;
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
        students: {
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
        }[];
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
    })[]>;
    findAll(): Promise<({
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
        students: {
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
        }[];
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
    })[]>;
    findOne(id: string): Promise<{
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
        students: {
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
        }[];
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
    }>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<{
        schedule: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            groupId: string;
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
        students: {
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
        }[];
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
    }>;
    remove(id: string): Promise<{
        number: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        curatorId: string | null;
        endYear: number | null;
        specialityId: string | null;
        startYear: number | null;
        course: number;
    }>;
}
