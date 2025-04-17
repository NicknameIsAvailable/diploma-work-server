import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    create(createGroupDto: CreateGroupDto): Promise<{
        schedule: {
            id: string;
            groupId: string;
        };
        curator: {
            name: string;
            id: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
        };
        students: {
            name: string;
            id: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
        }[];
    } & {
        number: string;
        label: string;
        id: string;
        curatorId: string;
    }>;
    createMany(createGroupDto: CreateGroupDto[]): Promise<({
        schedule: {
            id: string;
            groupId: string;
        };
        curator: {
            name: string;
            id: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
        };
        students: {
            name: string;
            id: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
        }[];
    } & {
        number: string;
        label: string;
        id: string;
        curatorId: string;
    })[]>;
    findAll(): Promise<({
        curator: {
            name: string;
            id: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
        };
        students: {
            name: string;
            id: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
        }[];
    } & {
        number: string;
        label: string;
        id: string;
        curatorId: string;
    })[]>;
    findOne(id: string): Promise<{
        curator: {
            name: string;
            id: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
        };
        students: {
            name: string;
            id: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
        }[];
    } & {
        number: string;
        label: string;
        id: string;
        curatorId: string;
    }>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<{
        schedule: {
            id: string;
            groupId: string;
        };
        curator: {
            name: string;
            id: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
        };
        students: {
            name: string;
            id: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
        }[];
    } & {
        number: string;
        label: string;
        id: string;
        curatorId: string;
    }>;
    remove(id: string): Promise<{
        number: string;
        label: string;
        id: string;
        curatorId: string;
    }>;
}
