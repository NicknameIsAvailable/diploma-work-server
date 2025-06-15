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
        createdAt: Date;
        updatedAt: Date | null;
    }>;
    createMany(data: CreateLessonDto[]): Promise<{
        description: string;
        label: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
    }[]>;
    findAll(): Promise<{
        description: string;
        label: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
    }[]>;
    findOne(id: string): Promise<{
        description: string;
        label: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
    }>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<{
        description: string;
        label: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        description: string;
        label: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
    }>;
}
