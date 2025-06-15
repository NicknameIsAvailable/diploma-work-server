import { CreateGroupDto } from '../group/dto/create-group.dto';
import { CreateLessonDto } from '../lesson/dto/create-lesson.dto';
import { CreateLessonOrderDto } from '../lesson-order/dto/create-lesson-order.dto';
import { CreateScheduleDto } from '../schedule/dto/create-schedule.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LessonService } from 'src/lesson/lesson.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { GroupService } from 'src/group/group.service';
import { LessonOrderService } from 'src/lesson-order/lesson-order.service';
export interface ParsedScheduleData {
    groups: CreateGroupDto[];
    lessons: CreateLessonDto[];
    lessonOrders: CreateLessonOrderDto[];
    schedules: CreateScheduleDto[];
    teacherMap: Map<string, string>;
    createdTeachers: string[];
}
export declare class CsvParserService {
    private prisma;
    private readonly groupService;
    private readonly lessonService;
    private readonly lessonOrderService;
    private readonly scheduleService;
    constructor(prisma: PrismaService, groupService: GroupService, lessonService: LessonService, lessonOrderService: LessonOrderService, scheduleService: ScheduleService);
    private readonly logger;
    parseScheduleCSV(buffer: Buffer): Promise<ParsedScheduleData>;
    private saveToDatabase;
    private readCSVBuffer;
    private getOrCreateGroup;
    private getOrCreateLesson;
    private getOrCreateLessonOrder;
    private getOrCreateTeacher;
    private generateStartTime;
    private generateEndTime;
    private transliterate;
}
