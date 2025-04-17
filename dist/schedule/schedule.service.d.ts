import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ScheduleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createScheduleDto: CreateScheduleDto): Promise<{
        group: {
            number: string;
            label: string;
            id: string;
            curatorId: string;
        };
        _count: {
            group: number;
            days: number;
        };
        days: {
            id: string;
            day: string;
            scheduleId: string;
        }[];
    } & {
        id: string;
        groupId: string;
    }>;
    createMany(createScheduleDtos: CreateScheduleDto[]): Promise<({
        group: {
            number: string;
            label: string;
            id: string;
            curatorId: string;
        };
        _count: {
            group: number;
            days: number;
        };
        days: {
            id: string;
            day: string;
            scheduleId: string;
        }[];
    } & {
        id: string;
        groupId: string;
    })[]>;
    findAll(groupIDs?: string[], teacherIDs?: string[], lessonIDs?: string[]): Promise<({
        group: {
            number: string;
            label: string;
            id: string;
            curatorId: string;
        };
        _count: {
            group: number;
            days: number;
        };
        days: {
            id: string;
            day: string;
            scheduleId: string;
        }[];
    } & {
        id: string;
        groupId: string;
    })[]>;
    findOne(id: string): Promise<{
        group: {
            number: string;
            label: string;
            id: string;
            curatorId: string;
        };
        _count: {
            group: number;
            days: number;
        };
        days: {
            id: string;
            day: string;
            scheduleId: string;
        }[];
    } & {
        id: string;
        groupId: string;
    }>;
    update(id: string, updateScheduleDto: UpdateScheduleDto): Promise<{
        group: {
            number: string;
            label: string;
            id: string;
            curatorId: string;
        };
        _count: {
            group: number;
            days: number;
        };
        days: {
            id: string;
            day: string;
            scheduleId: string;
        }[];
    } & {
        id: string;
        groupId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        groupId: string;
    }>;
    private createDaysData;
    private getScheduleInclude;
}
