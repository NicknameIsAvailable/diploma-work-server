import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
export declare class LessonController {
    private readonly lessonService;
    constructor(lessonService: LessonService);
    create(createLessonDto: CreateLessonDto): Promise<{
        description: string;
        label: string;
        id: string;
    }>;
    createMany(data: CreateLessonDto[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
    findAll(): Promise<{
        description: string;
        label: string;
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        description: string;
        label: string;
        id: string;
    }>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<{
        description: string;
        label: string;
        id: string;
    }>;
    remove(id: string): Promise<{
        description: string;
        label: string;
        id: string;
    }>;
}
