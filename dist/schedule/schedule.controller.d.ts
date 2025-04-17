import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
export declare class ScheduleController {
    private readonly scheduleService;
    constructor(scheduleService: ScheduleService);
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
    createMany(createScheduleDto: CreateScheduleDto[]): Promise<({
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
    findAll(groupIDs?: string, teacherIDs?: string, lessonIDs?: string): Promise<({
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
}
