import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ExcelParserService } from 'src/excel-parser/excel-parser.service';
import { File as MulterFile } from 'multer';
import { CsvParserService, ParsedScheduleData } from 'src/csv-parser/csv-parser.service';
export declare class ScheduleController {
    private readonly scheduleService;
    private readonly excelParserService;
    private readonly csvParserService;
    constructor(scheduleService: ScheduleService, excelParserService: ExcelParserService, csvParserService: CsvParserService);
    create(createScheduleDto: CreateScheduleDto): Promise<{
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
        _count: {
            group: number;
            days: number;
        };
        days: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            day: string;
            scheduleId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        groupId: string;
    }>;
    parseSchedule(file: MulterFile): Promise<ParsedScheduleData>;
    createMany(createScheduleDto: CreateScheduleDto[]): Promise<({
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
        _count: {
            group: number;
            days: number;
        };
        days: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            day: string;
            scheduleId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        groupId: string;
    })[]>;
    findAll(groupIDs?: string): Promise<({
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
        _count: {
            group: number;
            days: number;
        };
        days: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            day: string;
            scheduleId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        groupId: string;
    })[]>;
    findOne(id: string): Promise<{
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
        _count: {
            group: number;
            days: number;
        };
        days: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            day: string;
            scheduleId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        groupId: string;
    }>;
    update(id: string, updateScheduleDto: UpdateScheduleDto): Promise<{
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
        _count: {
            group: number;
            days: number;
        };
        days: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            day: string;
            scheduleId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        groupId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        groupId: string;
    }>;
}
