import { ScheduleLessonService } from './schedule-lesson.service';
import { CreateScheduleLessonDto } from './dto/create-schedule-lesson.dto';
import { UpdateScheduleLessonDto } from './dto/update-schedule-lesson.dto';
export declare class ScheduleLessonController {
    private readonly scheduleLessonService;
    constructor(scheduleLessonService: ScheduleLessonService);
    create(createScheduleLessonDto: CreateScheduleLessonDto): Promise<{
        order: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            order: number;
            startTime: string;
            endTime: string;
        };
        lesson: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            description: string;
            label: string;
        };
        scheduleDay: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            scheduleId: string;
            day: string;
        };
        teachers: {
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
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        scheduleDayId: string | null;
        lessonId: string;
        audiences: string[];
        orderId: string;
    }>;
    createMany(createScheduleLessonDto: CreateScheduleLessonDto[]): Promise<({
        order: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            order: number;
            startTime: string;
            endTime: string;
        };
        lesson: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            description: string;
            label: string;
        };
        scheduleDay: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            scheduleId: string;
            day: string;
        };
        teachers: {
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
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        scheduleDayId: string | null;
        lessonId: string;
        audiences: string[];
        orderId: string;
    })[]>;
    findAll(): Promise<({
        lesson: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            description: string;
            label: string;
        };
        scheduleDay: {
            schedule: {
                group: {
                    number: string;
                    id: string;
                    updatedAt: Date | null;
                    createdAt: Date;
                    curatorId: string | null;
                    endYear: number | null;
                    specialityId: string | null;
                    startYear: number | null;
                    course: number;
                };
            } & {
                id: string;
                updatedAt: Date | null;
                createdAt: Date;
                groupId: string;
            };
        } & {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            scheduleId: string;
            day: string;
        };
        teachers: {
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
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        scheduleDayId: string | null;
        lessonId: string;
        audiences: string[];
        orderId: string;
    })[]>;
    findOne(id: string): Promise<{
        lesson: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            description: string;
            label: string;
        };
        scheduleDay: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            scheduleId: string;
            day: string;
        };
    } & {
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        scheduleDayId: string | null;
        lessonId: string;
        audiences: string[];
        orderId: string;
    }>;
    update(id: string, updateScheduleLessonDto: UpdateScheduleLessonDto): Promise<{
        lesson: {
            id: string;
            updatedAt: Date | null;
            createdAt: Date;
            description: string;
            label: string;
        };
        teachers: {
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
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        scheduleDayId: string | null;
        lessonId: string;
        audiences: string[];
        orderId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        scheduleDayId: string | null;
        lessonId: string;
        audiences: string[];
        orderId: string;
    }>;
}
