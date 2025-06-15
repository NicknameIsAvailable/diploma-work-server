"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CsvParserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvParserService = void 0;
const common_1 = require("@nestjs/common");
const csv = require("csv-parser");
const create_schedule_dto_1 = require("../schedule/dto/create-schedule.dto");
const uuid_1 = require("uuid");
const stream_1 = require("stream");
const prisma_service_1 = require("../prisma/prisma.service");
const lesson_service_1 = require("../lesson/lesson.service");
const schedule_service_1 = require("../schedule/schedule.service");
const group_service_1 = require("../group/group.service");
const lesson_order_service_1 = require("../lesson-order/lesson-order.service");
const create_user_dto_1 = require("../user/dto/create-user.dto");
let CsvParserService = CsvParserService_1 = class CsvParserService {
    constructor(prisma, groupService, lessonService, lessonOrderService, scheduleService) {
        this.prisma = prisma;
        this.groupService = groupService;
        this.lessonService = lessonService;
        this.lessonOrderService = lessonOrderService;
        this.scheduleService = scheduleService;
        this.logger = new common_1.Logger(CsvParserService_1.name);
    }
    async parseScheduleCSV(buffer) {
        this.logger.log(`Parsing schedule CSV file`);
        const result = {
            groups: [],
            lessons: [],
            lessonOrders: [],
            schedules: [],
            teacherMap: new Map(),
            createdTeachers: [],
        };
        const rawData = await this.readCSVBuffer(buffer);
        if (!rawData || rawData.length === 0) {
            this.logger.error('No data found in CSV file');
            return result;
        }
        const lessonMap = new Map();
        const lessonOrderMap = new Map();
        const groupMap = new Map();
        const groupWeekSchedule = new Map();
        const dayColumns = {
            ПОНЕДЕЛЬНИК: create_schedule_dto_1.DayEnum.MONDAY,
            ВТОРНИК: create_schedule_dto_1.DayEnum.TUESDAY,
            СРЕДА: create_schedule_dto_1.DayEnum.WEDNESDAY,
            ЧЕТВЕРГ: create_schedule_dto_1.DayEnum.THURSDAY,
            ПЯТНИЦА: create_schedule_dto_1.DayEnum.FRIDAY,
            СУББОТА: create_schedule_dto_1.DayEnum.SATURDAY,
            ВОСКРЕСЕНЬЕ: create_schedule_dto_1.DayEnum.SUNDAY,
        };
        const dayColumnIndices = new Map();
        let currentGroup = null;
        let currentGroupId = null;
        for (let i = 1; i <= 8; i++) {
            const lessonOrderDto = {
                order: i,
                startTime: this.generateStartTime(i),
                endTime: this.generateEndTime(i),
            };
            result.lessonOrders.push(lessonOrderDto);
        }
        for (let i = 0; i < rawData.length; i++) {
            const row = rawData[i];
            const rowEntries = Object.entries(row);
            if (rowEntries[0][1] &&
                rowEntries[0][1].toString().startsWith('группа')) {
                i++;
                if (i < rawData.length) {
                    const dayHeaderRow = rawData[i];
                    const dayEntries = Object.entries(dayHeaderRow);
                    dayColumnIndices.clear();
                    for (let j = 2; j < dayEntries.length; j++) {
                        const cellValue = dayEntries[j][1]?.toString().trim();
                        if (cellValue && dayColumns[cellValue]) {
                            const day = dayColumns[cellValue];
                            dayColumnIndices.set(day, [j]);
                            for (let k = j + 1; k < dayEntries.length; k++) {
                                const nextCell = dayEntries[k][1]?.toString().trim();
                                if (!nextCell || dayColumns[nextCell]) {
                                    break;
                                }
                                dayColumnIndices.get(day).push(k);
                            }
                        }
                    }
                }
                i += 2;
                i++;
                continue;
            }
            if (rowEntries[0][1] &&
                /^\d+-\d+[a-zа-я]?$/i.test(rowEntries[0][1].toString())) {
                currentGroup = rowEntries[0][1].toString();
                currentGroupId = await this.getOrCreateGroup(currentGroup, groupMap, result.groups);
                if (!groupWeekSchedule.has(currentGroupId)) {
                    const weekSchedule = new Map();
                    for (const day of Object.values(create_schedule_dto_1.DayEnum)) {
                        weekSchedule.set(day, {
                            day,
                            lessons: [],
                        });
                    }
                    groupWeekSchedule.set(currentGroupId, weekSchedule);
                }
            }
            if (!currentGroup || !currentGroupId)
                continue;
            const lessonOrderNum = parseInt(rowEntries[1]?.[1]?.toString() || '');
            if (!isNaN(lessonOrderNum) && lessonOrderNum > 0) {
                const weekSchedule = groupWeekSchedule.get(currentGroupId);
                const lessonOrderId = await this.getOrCreateLessonOrder(lessonOrderNum, lessonOrderMap, result.lessonOrders);
                for (const [day, columnIndices] of dayColumnIndices.entries()) {
                    const daySchedule = weekSchedule.get(day);
                    for (let colIdx = 0; colIdx < columnIndices.length; colIdx++) {
                        const subjectColIdx = columnIndices[colIdx];
                        const subjectName = rowEntries[subjectColIdx]?.[1]
                            ?.toString()
                            .trim();
                        if (!subjectName)
                            continue;
                        const nextRow = i + 1 < rawData.length ? rawData[i + 1] : null;
                        let teacherName = null;
                        if (nextRow) {
                            const nextRowEntries = Object.entries(nextRow);
                            teacherName = nextRowEntries[subjectColIdx]?.[1]
                                ?.toString()
                                .trim();
                        }
                        const classroomColIdx = subjectColIdx + 1;
                        const classroom = rowEntries[classroomColIdx]?.[1]
                            ?.toString()
                            .trim();
                        const lessonId = await this.getOrCreateLesson(subjectName, lessonMap, result.lessons);
                        let teacherId = null;
                        if (teacherName) {
                            teacherId = await this.getOrCreateTeacher(teacherName, result.teacherMap, result.createdTeachers);
                        }
                        const scheduleLesson = {
                            lessonId,
                            order: lessonOrderNum - 1,
                            audiences: classroom ? [classroom] : [],
                            teacherIds: teacherId ? [teacherId] : [],
                            orderId: lessonOrderId,
                            scheduleDayId: (0, uuid_1.v4)(),
                        };
                        daySchedule.lessons.push(scheduleLesson);
                    }
                }
            }
        }
        for (const [groupId, weekSchedule] of groupWeekSchedule.entries()) {
            const scheduleDto = {
                groupId,
                week: Array.from(weekSchedule.values()).filter((day) => day.lessons.length > 0),
            };
            if (scheduleDto.week.length > 0) {
                result.schedules.push(scheduleDto);
            }
        }
        await this.saveToDatabase(result);
        return result;
    }
    async saveToDatabase(data) {
        this.logger.log('Saving parsed data to database');
        try {
            this.logger.log(`Creating ${data.lessonOrders.length} lesson orders`);
            await this.lessonOrderService.createMany(data.lessonOrders);
            this.logger.log(`Creating ${data.lessons.length} lessons`);
            const createdLessons = await this.lessonService.createMany(data.lessons);
            this.logger.log(`Creating ${data.groups.length} groups`);
            const createdGroups = await this.groupService.createMany(data.groups);
            this.logger.log(`Creating ${data.schedules.length} schedules`);
            const groupsWithSchedules = new Set(data.schedules.map((s) => s.groupId));
            const schedulesToCreate = [];
            for (const schedule of data.schedules) {
                try {
                    const existingSchedule = await this.prisma.schedule.findUnique({
                        where: { groupId: schedule.groupId },
                    });
                    if (!existingSchedule) {
                        schedulesToCreate.push(schedule);
                    }
                    else {
                        this.logger.warn(`Schedule already exists for group ${schedule.groupId}`);
                        const scheduleDays = await this.prisma.scheduleDay.findMany({
                            where: { scheduleId: existingSchedule.id },
                            select: { id: true },
                        });
                        for (const day of scheduleDays) {
                            await this.prisma.scheduleLesson.deleteMany({
                                where: { scheduleDayId: day.id },
                            });
                        }
                        await this.prisma.scheduleDay.deleteMany({
                            where: { scheduleId: existingSchedule.id },
                        });
                        for (const day of schedule.week) {
                            const createdDay = await this.prisma.scheduleDay.create({
                                data: {
                                    day: day.day,
                                    schedule: { connect: { id: existingSchedule.id } },
                                },
                            });
                            for (const lesson of day.lessons) {
                                await this.prisma.scheduleLesson.create({
                                    data: {
                                        scheduleDayId: createdDay.id,
                                        lessonId: lesson.lessonId,
                                        audiences: lesson.audiences,
                                        orderId: lesson.orderId,
                                        teachers: {
                                            connect: lesson.teacherIds.map((id) => ({ id })),
                                        },
                                    },
                                });
                            }
                        }
                    }
                }
                catch (error) {
                    this.logger.error(`Error processing schedule for group ${schedule.groupId}: ${error.message}`);
                }
            }
            if (schedulesToCreate.length > 0) {
                await this.scheduleService.createMany(schedulesToCreate);
            }
            this.logger.log('Successfully saved all data to database');
        }
        catch (error) {
            this.logger.error(`Error saving data to database: ${error.message}`);
            throw error;
        }
    }
    readCSVBuffer(buffer) {
        return new Promise((resolve, reject) => {
            const results = [];
            stream_1.Readable.from(buffer)
                .pipe(csv({ separator: ',', headers: false }))
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (err) => reject(err));
        });
    }
    async getOrCreateGroup(groupName, groupMap, groups) {
        if (groupMap.has(groupName)) {
            return groupMap.get(groupName);
        }
        const groupNumber = groupName.split('-')[1] || '';
        const course = parseInt(groupName.split('-')[0]) || 1;
        const currentYear = new Date().getFullYear();
        const existingGroup = await this.prisma.group.findFirst({
            where: { number: groupNumber },
        });
        if (existingGroup) {
            groupMap.set(groupName, existingGroup.id);
            return existingGroup.id;
        }
        const newGroup = {
            number: groupNumber,
            studentIds: [],
            course: course,
            startYear: currentYear,
            endYear: currentYear + 4,
        };
        groups.push(newGroup);
        const tempId = (0, uuid_1.v4)();
        groupMap.set(groupName, tempId);
        return tempId;
    }
    async getOrCreateLesson(lessonName, lessonMap, lessons) {
        if (lessonMap.has(lessonName)) {
            return lessonMap.get(lessonName);
        }
        const existingLesson = await this.prisma.lesson.findFirst({
            where: { label: lessonName },
        });
        if (existingLesson) {
            lessonMap.set(lessonName, existingLesson.id);
            return existingLesson.id;
        }
        const newLesson = {
            label: lessonName,
            description: '',
        };
        lessons.push(newLesson);
        const tempId = (0, uuid_1.v4)();
        lessonMap.set(lessonName, tempId);
        return tempId;
    }
    async getOrCreateLessonOrder(orderNumber, lessonOrderMap, lessonOrders) {
        if (lessonOrderMap.has(orderNumber)) {
            return lessonOrderMap.get(orderNumber);
        }
        const existingOrder = await this.prisma.lessonOrder.findFirst({
            where: { order: orderNumber },
        });
        if (existingOrder) {
            lessonOrderMap.set(orderNumber, existingOrder.id);
            return existingOrder.id;
        }
        const tempId = (0, uuid_1.v4)();
        lessonOrderMap.set(orderNumber, tempId);
        return tempId;
    }
    async getOrCreateTeacher(teacherName, teacherMap, createdTeachers) {
        if (teacherMap.has(teacherName)) {
            return teacherMap.get(teacherName);
        }
        const nameParts = teacherName.split(/\s+/);
        let firstName = '';
        let lastName = '';
        if (nameParts.length >= 2) {
            lastName = nameParts[0];
            firstName = nameParts[1];
        }
        else {
            lastName = teacherName;
            firstName = '';
        }
        const existingTeacher = await this.prisma.user.findFirst({
            where: {
                AND: [
                    { surname: lastName },
                    { name: { contains: firstName } },
                    { role: 'TEACHER' },
                ],
            },
        });
        if (existingTeacher) {
            teacherMap.set(teacherName, existingTeacher.id);
            return existingTeacher.id;
        }
        try {
            const login = `${this.transliterate(lastName).toLowerCase()}_${this.transliterate(firstName).toLowerCase()}`;
            const email = `${login}@example.com`;
            const defaultPassword = '12345678';
            const newTeacher = await this.prisma.user.create({
                data: {
                    name: firstName || 'Имя',
                    surname: lastName || 'Фамилия',
                    login,
                    email,
                    passwordHash: defaultPassword,
                    role: create_user_dto_1.EUserRole.TEACHER,
                },
            });
            teacherMap.set(teacherName, newTeacher.id);
            createdTeachers.push(newTeacher.id);
            return newTeacher.id;
        }
        catch (error) {
            this.logger.error(`Failed to create teacher ${teacherName}: ${error.message}`);
            const tempId = (0, uuid_1.v4)();
            teacherMap.set(teacherName, tempId);
            return tempId;
        }
    }
    generateStartTime(orderNumber) {
        const startHour = 8 + Math.floor((orderNumber - 1) / 2);
        const startMinute = (orderNumber - 1) % 2 === 0 ? '00' : '45';
        return `${startHour.toString().padStart(2, '0')}:${startMinute}`;
    }
    generateEndTime(orderNumber) {
        const startHour = 8 + Math.floor((orderNumber - 1) / 2);
        const startMinute = (orderNumber - 1) % 2 === 0 ? '00' : '45';
        const endHour = startMinute === '00' ? startHour : startHour + 1;
        const endMinute = startMinute === '00' ? '45' : '30';
        return `${endHour.toString().padStart(2, '0')}:${endMinute}`;
    }
    transliterate(text) {
        const chars = {
            а: 'a',
            б: 'b',
            в: 'v',
            г: 'g',
            д: 'd',
            е: 'e',
            ё: 'e',
            ж: 'zh',
            з: 'z',
            и: 'i',
            й: 'y',
            к: 'k',
            л: 'l',
            м: 'm',
            н: 'n',
            о: 'o',
            п: 'p',
            р: 'r',
            с: 's',
            т: 't',
            у: 'u',
            ф: 'f',
            х: 'h',
            ц: 'ts',
            ч: 'ch',
            ш: 'sh',
            щ: 'sch',
            ъ: '',
            ы: 'y',
            ь: '',
            э: 'e',
            ю: 'yu',
            я: 'ya',
            А: 'A',
            Б: 'B',
            В: 'V',
            Г: 'G',
            Д: 'D',
            Е: 'E',
            Ё: 'E',
            Ж: 'Zh',
            З: 'Z',
            И: 'I',
            Й: 'Y',
            К: 'K',
            Л: 'L',
            М: 'M',
            Н: 'N',
            О: 'O',
            П: 'P',
            Р: 'R',
            С: 'S',
            Т: 'T',
            У: 'U',
            Ф: 'F',
            Х: 'H',
            Ц: 'Ts',
            Ч: 'Ch',
            Ш: 'Sh',
            Щ: 'Sch',
            Ъ: '',
            Ы: 'Y',
            Ь: '',
            Э: 'E',
            Ю: 'Yu',
            Я: 'Ya',
            '.': '',
            ' ': '_',
            '(': '',
            ')': '',
            ',': '',
            '-': '_',
        };
        return text
            .split('')
            .map((char) => chars[char] || char)
            .join('');
    }
};
exports.CsvParserService = CsvParserService;
exports.CsvParserService = CsvParserService = CsvParserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        group_service_1.GroupService,
        lesson_service_1.LessonService,
        lesson_order_service_1.LessonOrderService,
        schedule_service_1.ScheduleService])
], CsvParserService);
//# sourceMappingURL=csv-parser.service.js.map