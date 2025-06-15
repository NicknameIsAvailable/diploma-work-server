import { CreateScheduleLessonDto } from './dto/create-schedule-lesson.dto';
import { UpdateScheduleLessonDto } from './dto/update-schedule-lesson.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ScheduleLessonService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createScheduleLessonDto: CreateScheduleLessonDto): Promise<{
        lesson: {
            description: string;
            label: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
        };
        scheduleDay: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            day: string;
            scheduleId: string;
        };
        order: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            order: number;
            startTime: string;
            endTime: string;
        };
        teachers: {
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
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        audiences: string[];
        lessonId: string;
        scheduleDayId: string | null;
        orderId: string;
    }>;
    createMany(createScheduleLessonDtos: CreateScheduleLessonDto[]): Promise<({
        lesson: {
            description: string;
            label: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
        };
        scheduleDay: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            day: string;
            scheduleId: string;
        };
        order: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            order: number;
            startTime: string;
            endTime: string;
        };
        teachers: {
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
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        audiences: string[];
        lessonId: string;
        scheduleDayId: string | null;
        orderId: string;
    })[]>;
    findAll(groupIDs?: string[], teacherIDs?: string[], lessonIDs?: string[]): Promise<({
        lesson: {
            description: string;
            label: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
        };
        scheduleDay: {
            schedule: {
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
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date | null;
                groupId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            day: string;
            scheduleId: string;
        };
        teachers: {
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
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        audiences: string[];
        lessonId: string;
        scheduleDayId: string | null;
        orderId: string;
    })[]>;
    findOne(id: string): Promise<{
        lesson: {
            description: string;
            label: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
        };
        scheduleDay: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            day: string;
            scheduleId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        audiences: string[];
        lessonId: string;
        scheduleDayId: string | null;
        orderId: string;
    }>;
    update(id: string, updateScheduleLessonDto: UpdateScheduleLessonDto): Promise<{
        lesson: {
            description: string;
            label: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
        };
        teachers: {
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
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        audiences: string[];
        lessonId: string;
        scheduleDayId: string | null;
        orderId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        audiences: string[];
        lessonId: string;
        scheduleDayId: string | null;
        orderId: string;
    }>;
}
