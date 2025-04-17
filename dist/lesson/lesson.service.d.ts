import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class LessonService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createLessonDto: CreateLessonDto): Promise<{
        description: string;
        label: string;
        id: string;
    }>;
    createMany(data: CreateLessonDto[]): Promise<Prisma.BatchPayload>;
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
