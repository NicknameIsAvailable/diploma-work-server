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
        };
        scheduleDay: {
            id: string;
            day: string;
            scheduleId: string;
        };
        teachers: {
            name: string;
            id: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
        }[];
    } & {
        id: string;
        lessonId: string;
        order: number;
        audiences: string[];
        scheduleDayId: string | null;
    }>;
    createMany(createScheduleLessonDtos: CreateScheduleLessonDto[]): Promise<({
        lesson: {
            description: string;
            label: string;
            id: string;
        };
        scheduleDay: {
            id: string;
            day: string;
            scheduleId: string;
        };
        teachers: {
            name: string;
            id: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
        }[];
    } & {
        id: string;
        lessonId: string;
        order: number;
        audiences: string[];
        scheduleDayId: string | null;
    })[]>;
    findAll(groupIDs?: string[], teacherIDs?: string[], lessonIDs?: string[]): Promise<({
        lesson: {
            description: string;
            label: string;
            id: string;
        };
        scheduleDay: {
            schedule: {
                group: {
                    number: string;
                    label: string;
                    id: string;
                    curatorId: string;
                };
            } & {
                id: string;
                groupId: string;
            };
        } & {
            id: string;
            day: string;
            scheduleId: string;
        };
        teachers: {
            name: string;
            id: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
        }[];
    } & {
        id: string;
        lessonId: string;
        order: number;
        audiences: string[];
        scheduleDayId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        lesson: {
            description: string;
            label: string;
            id: string;
        };
        scheduleDay: {
            id: string;
            day: string;
            scheduleId: string;
        };
    } & {
        id: string;
        lessonId: string;
        order: number;
        audiences: string[];
        scheduleDayId: string | null;
    }>;
    update(id: string, updateScheduleLessonDto: UpdateScheduleLessonDto): Promise<{
        lesson: {
            description: string;
            label: string;
            id: string;
        };
        teachers: {
            name: string;
            id: string;
            surname: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
        }[];
    } & {
        id: string;
        lessonId: string;
        order: number;
        audiences: string[];
        scheduleDayId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        lessonId: string;
        order: number;
        audiences: string[];
        scheduleDayId: string | null;
    }>;
}
