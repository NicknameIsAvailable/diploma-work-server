import { LessonOrderService } from './lesson-order.service';
import { CreateLessonOrderDto } from './dto/create-lesson-order.dto';
import { UpdateLessonOrderDto } from './dto/update-lesson-order.dto';
export declare class LessonOrderController {
    private readonly lessonOrderService;
    constructor(lessonOrderService: LessonOrderService);
    create(createLessonOrderDto: CreateLessonOrderDto): import("@prisma/client").Prisma.Prisma__LessonOrderClient<{
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        order: number;
        startTime: string;
        endTime: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        order: number;
        startTime: string;
        endTime: string;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__LessonOrderClient<{
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        order: number;
        startTime: string;
        endTime: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateLessonOrderDto: UpdateLessonOrderDto): import("@prisma/client").Prisma.Prisma__LessonOrderClient<{
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        order: number;
        startTime: string;
        endTime: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__LessonOrderClient<{
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        order: number;
        startTime: string;
        endTime: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
