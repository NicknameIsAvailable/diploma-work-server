import { CreateLessonOrderDto } from './dto/create-lesson-order.dto';
import { UpdateLessonOrderDto } from './dto/update-lesson-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class LessonOrderService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createLessonOrderDto: CreateLessonOrderDto): import("@prisma/client").Prisma.Prisma__LessonOrderClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        order: number;
        startTime: string;
        endTime: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createMany(createLessonOrderDtos: CreateLessonOrderDto[]): Promise<any[] | import("@prisma/client").Prisma.BatchPayload>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        scheduleLessons: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            audiences: string[];
            lessonId: string;
            scheduleDayId: string | null;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        order: number;
        startTime: string;
        endTime: string;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__LessonOrderClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        order: number;
        startTime: string;
        endTime: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateLessonOrderDto: UpdateLessonOrderDto): import("@prisma/client").Prisma.Prisma__LessonOrderClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        order: number;
        startTime: string;
        endTime: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__LessonOrderClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        order: number;
        startTime: string;
        endTime: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
