import { Injectable, Logger } from '@nestjs/common';
import * as csv from 'csv-parser';
import { CreateGroupDto } from '../group/dto/create-group.dto';
import { CreateLessonDto } from '../lesson/dto/create-lesson.dto';
import { CreateLessonOrderDto } from '../lesson-order/dto/create-lesson-order.dto';
import {
  CreateScheduleDto,
  DayEnum,
  ScheduleDayDto,
  ScheduleLessonDto,
} from '../schedule/dto/create-schedule.dto';
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream';
import { PrismaService } from 'src/prisma/prisma.service';
import { LessonService } from 'src/lesson/lesson.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { GroupService } from 'src/group/group.service';
import { LessonOrderService } from 'src/lesson-order/lesson-order.service';
import { UserService } from 'src/user/user.service';
import { EUserRole } from 'src/user/dto/create-user.dto';

export interface ParsedScheduleData {
  groups: CreateGroupDto[];
  lessons: CreateLessonDto[];
  lessonOrders: CreateLessonOrderDto[];
  schedules: CreateScheduleDto[];
  teacherMap: Map<string, string>; // Maps teacher name to ID
  createdTeachers: string[]; // IDs of created teachers
}

@Injectable()
export class CsvParserService {
  constructor(
    private prisma: PrismaService,
    private readonly groupService: GroupService,
    private readonly lessonService: LessonService,
    private readonly lessonOrderService: LessonOrderService,
    private readonly scheduleService: ScheduleService,
  ) {}

  private readonly logger = new Logger(CsvParserService.name);

  /**
   * Parse schedule CSV file and extract all required data
   * @param buffer CSV file buffer
   */
  async parseScheduleCSV(buffer: Buffer): Promise<ParsedScheduleData> {
    this.logger.log(`Parsing schedule CSV file`);

    // Create a structured object to hold all parsed data
    const result: ParsedScheduleData = {
      groups: [],
      lessons: [],
      lessonOrders: [],
      schedules: [],
      teacherMap: new Map<string, string>(),
      createdTeachers: [],
    };

    // Read the CSV file
    const rawData: any[] = await this.readCSVBuffer(buffer);

    if (!rawData || rawData.length === 0) {
      this.logger.error('No data found in CSV file');
      return result;
    }

    // Data processing maps to avoid duplicates
    const lessonMap = new Map<string, string>(); // Maps lesson name to ID
    const lessonOrderMap = new Map<number, string>(); // Maps order number to ID
    const groupMap = new Map<string, string>(); // Maps group name to ID
    const groupWeekSchedule = new Map<string, Map<string, ScheduleDayDto>>(); // Maps group ID to week schedule

    // Days of the week mapping
    const dayColumns = {
      ПОНЕДЕЛЬНИК: DayEnum.MONDAY,
      ВТОРНИК: DayEnum.TUESDAY,
      СРЕДА: DayEnum.WEDNESDAY,
      ЧЕТВЕРГ: DayEnum.THURSDAY,
      ПЯТНИЦА: DayEnum.FRIDAY,
      СУББОТА: DayEnum.SATURDAY,
      ВОСКРЕСЕНЬЕ: DayEnum.SUNDAY,
    };

    // Find the day columns in the header rows
    const dayColumnIndices = new Map<DayEnum, number[]>();

    let currentGroup: string = null;
    let currentGroupId: string = null;

    // First pass: Create lesson orders
    for (let i = 1; i <= 8; i++) {
      const lessonOrderDto: CreateLessonOrderDto = {
        order: i,
        startTime: this.generateStartTime(i),
        endTime: this.generateEndTime(i),
      };
      result.lessonOrders.push(lessonOrderDto);
    }

    // Process the raw data
    for (let i = 0; i < rawData.length; i++) {
      const row = rawData[i];
      const rowEntries = Object.entries(row);

      // Check if this is a group row
      if (
        rowEntries[0][1] &&
        rowEntries[0][1].toString().startsWith('группа')
      ) {
        // Skip the header row
        i++;

        // Process the day header row
        if (i < rawData.length) {
          const dayHeaderRow = rawData[i];
          const dayEntries = Object.entries(dayHeaderRow);

          // Clear day column indices for the new group section
          dayColumnIndices.clear();

          // Find day columns
          for (let j = 2; j < dayEntries.length; j++) {
            const cellValue = dayEntries[j][1]?.toString().trim();
            if (cellValue && dayColumns[cellValue]) {
              const day = dayColumns[cellValue];
              dayColumnIndices.set(day, [j]);

              // Look ahead for additional columns of this day
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

        // Skip the subject and teacher header rows
        i += 2;

        // Skip the lesson number row
        i++;

        // Continue to next iteration
        continue;
      }

      // Check if this is a group data row
      if (
        rowEntries[0][1] &&
        /^\d+-\d+[a-zа-я]?$/i.test(rowEntries[0][1].toString())
      ) {
        // This is a group identifier row
        currentGroup = rowEntries[0][1].toString();
        currentGroupId = await this.getOrCreateGroup(
          currentGroup,
          groupMap,
          result.groups,
        );

        // Initialize or reset the week schedule for the new group
        if (!groupWeekSchedule.has(currentGroupId)) {
          const weekSchedule = new Map<string, ScheduleDayDto>();
          for (const day of Object.values(DayEnum)) {
            weekSchedule.set(day, {
              day,
              lessons: [],
            });
          }
          groupWeekSchedule.set(currentGroupId, weekSchedule);
        }
      }

      // Skip if we don't have a current group
      if (!currentGroup || !currentGroupId) continue;

      // Check if this is a lesson row (has lesson order number)
      const lessonOrderNum = parseInt(rowEntries[1]?.[1]?.toString() || '');
      if (!isNaN(lessonOrderNum) && lessonOrderNum > 0) {
        // Get the week schedule for the current group
        const weekSchedule = groupWeekSchedule.get(currentGroupId);

        // Get or create lesson order
        const lessonOrderId = await this.getOrCreateLessonOrder(
          lessonOrderNum,
          lessonOrderMap,
          result.lessonOrders,
        );

        // Process each day for this lesson order
        for (const [day, columnIndices] of dayColumnIndices.entries()) {
          const daySchedule = weekSchedule.get(day);

          // Extract lesson data for this day
          for (let colIdx = 0; colIdx < columnIndices.length; colIdx++) {
            const subjectColIdx = columnIndices[colIdx];

            // Get subject name from current row
            const subjectName = rowEntries[subjectColIdx]?.[1]
              ?.toString()
              .trim();
            if (!subjectName) continue;

            // Get teacher name from next row (if available)
            const nextRow = i + 1 < rawData.length ? rawData[i + 1] : null;
            let teacherName = null;
            if (nextRow) {
              const nextRowEntries = Object.entries(nextRow);
              teacherName = nextRowEntries[subjectColIdx]?.[1]
                ?.toString()
                .trim();
            }

            // Get classroom from this row
            const classroomColIdx = subjectColIdx + 1;
            const classroom = rowEntries[classroomColIdx]?.[1]
              ?.toString()
              .trim();

            // Create or get lesson
            const lessonId = await this.getOrCreateLesson(
              subjectName,
              lessonMap,
              result.lessons,
            );

            // Create or get teacher ID
            let teacherId = null;
            if (teacherName) {
              teacherId = await this.getOrCreateTeacher(
                teacherName,
                result.teacherMap,
                result.createdTeachers,
              );
            }

            // Create a schedule lesson
            const scheduleLesson: ScheduleLessonDto = {
              lessonId,
              order: lessonOrderNum - 1, // 0-based index
              audiences: classroom ? [classroom] : [],
              teacherIds: teacherId ? [teacherId] : [],
              orderId: lessonOrderId,
              scheduleDayId: uuidv4(), // Temporary ID, will be replaced
            };

            // Add to day schedule
            daySchedule.lessons.push(scheduleLesson);
          }
        }
      }
    }

    // Create schedules for each group
    for (const [groupId, weekSchedule] of groupWeekSchedule.entries()) {
      const scheduleDto: CreateScheduleDto = {
        groupId,
        week: Array.from(weekSchedule.values()).filter(
          (day) => day.lessons.length > 0,
        ),
      };

      // Only add schedule if it has lessons
      if (scheduleDto.week.length > 0) {
        result.schedules.push(scheduleDto);
      }
    }

    // Save to database
    await this.saveToDatabase(result);

    return result;
  }

  /**
   * Save all parsed data to the database
   */
  private async saveToDatabase(data: ParsedScheduleData): Promise<void> {
    this.logger.log('Saving parsed data to database');

    try {
      // 1. Save lesson orders first
      this.logger.log(`Creating ${data.lessonOrders.length} lesson orders`);
      await this.lessonOrderService.createMany(data.lessonOrders);

      // 2. Create lessons
      this.logger.log(`Creating ${data.lessons.length} lessons`);
      const createdLessons = await this.lessonService.createMany(data.lessons);

      // 3. Create groups
      this.logger.log(`Creating ${data.groups.length} groups`);
      const createdGroups = await this.groupService.createMany(data.groups);

      // 4. Create schedules
      this.logger.log(`Creating ${data.schedules.length} schedules`);
      const groupsWithSchedules = new Set(data.schedules.map((s) => s.groupId));

      // Process only groups that exist and don't already have schedules
      const schedulesToCreate = [];

      for (const schedule of data.schedules) {
        try {
          const existingSchedule = await this.prisma.schedule.findUnique({
            where: { groupId: schedule.groupId },
          });

          if (!existingSchedule) {
            schedulesToCreate.push(schedule);
          } else {
            this.logger.warn(
              `Schedule already exists for group ${schedule.groupId}`,
            );

            // Delete existing schedule days and lessons
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

            // Create new schedule days and lessons
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
        } catch (error) {
          this.logger.error(
            `Error processing schedule for group ${schedule.groupId}: ${error.message}`,
          );
        }
      }

      if (schedulesToCreate.length > 0) {
        await this.scheduleService.createMany(schedulesToCreate);
      }

      this.logger.log('Successfully saved all data to database');
    } catch (error) {
      this.logger.error(`Error saving data to database: ${error.message}`);
      throw error;
    }
  }

  /**
   * Read CSV buffer and return data as array of objects
   */
  private readCSVBuffer(buffer: Buffer): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results = [];
      Readable.from(buffer)
        .pipe(csv({ separator: ',', headers: false }))
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err));
    });
  }

  /**
   * Get or create a group and return its ID
   */
  private async getOrCreateGroup(
    groupName: string,
    groupMap: Map<string, string>,
    groups: CreateGroupDto[],
  ): Promise<string> {
    if (groupMap.has(groupName)) {
      return groupMap.get(groupName);
    }

    // Parse group name to extract number and create a new group
    const groupNumber = groupName.split('-')[1] || '';
    const course = parseInt(groupName.split('-')[0]) || 1;
    const currentYear = new Date().getFullYear();

    // Check if the group already exists in the database
    const existingGroup = await this.prisma.group.findFirst({
      where: { number: groupNumber },
    });

    if (existingGroup) {
      groupMap.set(groupName, existingGroup.id);
      return existingGroup.id;
    }

    // Create a new group if it doesn't exist
    const newGroup: CreateGroupDto = {
      number: groupNumber,
      studentIds: [],
      course: course,
      startYear: currentYear,
      endYear: currentYear + 4,
    };

    groups.push(newGroup);

    // Generate a temporary ID for reference
    const tempId = uuidv4();
    groupMap.set(groupName, tempId);

    return tempId;
  }

  /**
   * Get or create a lesson and return its ID
   */
  private async getOrCreateLesson(
    lessonName: string,
    lessonMap: Map<string, string>,
    lessons: CreateLessonDto[],
  ): Promise<string> {
    if (lessonMap.has(lessonName)) {
      return lessonMap.get(lessonName);
    }

    // Check if the lesson already exists in the database
    const existingLesson = await this.prisma.lesson.findFirst({
      where: { label: lessonName },
    });

    if (existingLesson) {
      lessonMap.set(lessonName, existingLesson.id);
      return existingLesson.id;
    }

    // Create a new lesson if it doesn't exist
    const newLesson: CreateLessonDto = {
      label: lessonName,
      description: '',
    };

    lessons.push(newLesson);

    // Generate a temporary ID for reference
    const tempId = uuidv4();
    lessonMap.set(lessonName, tempId);

    return tempId;
  }

  /**
   * Get or create a lesson order and return its ID
   */
  private async getOrCreateLessonOrder(
    orderNumber: number,
    lessonOrderMap: Map<number, string>,
    lessonOrders: CreateLessonOrderDto[],
  ): Promise<string> {
    if (lessonOrderMap.has(orderNumber)) {
      return lessonOrderMap.get(orderNumber);
    }

    // Check if the lesson order already exists in the database
    const existingOrder = await this.prisma.lessonOrder.findFirst({
      where: { order: orderNumber },
    });

    if (existingOrder) {
      lessonOrderMap.set(orderNumber, existingOrder.id);
      return existingOrder.id;
    }

    // Generate a temporary ID for reference
    const tempId = uuidv4();
    lessonOrderMap.set(orderNumber, tempId);

    return tempId;
  }

  /**
   * Get or create a teacher and return its ID
   */
  private async getOrCreateTeacher(
    teacherName: string,
    teacherMap: Map<string, string>,
    createdTeachers: string[],
  ): Promise<string> {
    if (teacherMap.has(teacherName)) {
      return teacherMap.get(teacherName);
    }

    // Format teacher name and create email/login
    const nameParts = teacherName.split(/\s+/);
    let firstName = '';
    let lastName = '';

    if (nameParts.length >= 2) {
      lastName = nameParts[0];
      firstName = nameParts[1];
    } else {
      lastName = teacherName;
      firstName = '';
    }

    // Check if teacher already exists
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

    // Create new teacher
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
          passwordHash: defaultPassword, // In a real system, this should be hashed
          role: EUserRole.TEACHER,
        },
      });

      teacherMap.set(teacherName, newTeacher.id);
      createdTeachers.push(newTeacher.id);
      return newTeacher.id;
    } catch (error) {
      this.logger.error(
        `Failed to create teacher ${teacherName}: ${error.message}`,
      );
      const tempId = uuidv4();
      teacherMap.set(teacherName, tempId);
      return tempId;
    }
  }

  /**
   * Generate start time for a lesson based on order number
   */
  private generateStartTime(orderNumber: number): string {
    // Lesson 1: 8:00, Lesson 2: 9:45, etc.
    const startHour = 8 + Math.floor((orderNumber - 1) / 2);
    const startMinute = (orderNumber - 1) % 2 === 0 ? '00' : '45';
    return `${startHour.toString().padStart(2, '0')}:${startMinute}`;
  }

  /**
   * Generate end time for a lesson based on order number
   */
  private generateEndTime(orderNumber: number): string {
    const startHour = 8 + Math.floor((orderNumber - 1) / 2);
    const startMinute = (orderNumber - 1) % 2 === 0 ? '00' : '45';
    const endHour = startMinute === '00' ? startHour : startHour + 1;
    const endMinute = startMinute === '00' ? '45' : '30';
    return `${endHour.toString().padStart(2, '0')}:${endMinute}`;
  }

  /**
   * Simple transliteration for Cyrillic to Latin
   */
  private transliterate(text: string): string {
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
}
