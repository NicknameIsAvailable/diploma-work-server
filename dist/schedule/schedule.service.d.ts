import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ScheduleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createScheduleDto: CreateScheduleDto): Promise<{
        group: {
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
        _count: {
            group: number;
            days: number;
        };
        days: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            day: string;
            scheduleId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        groupId: string;
    }>;
    createMany(createScheduleDtos: CreateScheduleDto[]): Promise<({
        group: {
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
        _count: {
            group: number;
            days: number;
        };
        days: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            day: string;
            scheduleId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        groupId: string;
    })[]>;
    findAll(groupIDs?: string[], teacherIDs?: string[], lessonIDs?: string[]): Promise<({
        group: {
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
        _count: {
            group: number;
            days: number;
        };
        days: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            day: string;
            scheduleId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        groupId: string;
    })[]>;
    findOne(id: string): Promise<{
        group: {
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
        _count: {
            group: number;
            days: number;
        };
        days: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            day: string;
            scheduleId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        groupId: string;
    }>;
    update(id: string, updateScheduleDto: UpdateScheduleDto): Promise<{
        group: {
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
        _count: {
            group: number;
            days: number;
        };
        days: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            day: string;
            scheduleId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        groupId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        groupId: string;
    }>;
    private createDaysData;
    private getScheduleInclude;
}
