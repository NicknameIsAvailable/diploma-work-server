import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
export declare class LessonController {
    private readonly lessonService;
    constructor(lessonService: LessonService);
    create(createLessonDto: CreateLessonDto): Promise<{
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        description: string;
        label: string;
    }>;
    createMany(data: CreateLessonDto[]): Promise<{
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        description: string;
        label: string;
    }[]>;
    findAll(): Promise<{
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        description: string;
        label: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        description: string;
        label: string;
    }>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<{
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        description: string;
        label: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        description: string;
        label: string;
    }>;
}
