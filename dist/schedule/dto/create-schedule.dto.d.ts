export declare enum DayEnum {
    MONDAY = "monday",
    TUESDAY = "tuesday",
    WEDNESDAY = "wednesday",
    THURSDAY = "thursday",
    FRIDAY = "friday",
    SATURDAY = "saturday",
    SUNDAY = "sunday"
}
export declare class ScheduleLessonDto {
    lessonId: string;
    order: number;
    audiences: string[];
    teacherIds: string[];
    orderId: string;
    scheduleDayId: string;
}
export declare class ScheduleDayDto {
    day: DayEnum;
    lessons: ScheduleLessonDto[];
}
export declare class CreateScheduleDto {
    groupId: string;
    week: ScheduleDayDto[];
}
