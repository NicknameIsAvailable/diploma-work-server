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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ScheduleService = class ScheduleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createScheduleDto) {
        const { groupId, week } = createScheduleDto;
        if (!week || week.length === 0) {
            throw new common_1.BadRequestException('Week data is required');
        }
        try {
            const group = await this.prisma.group.findUnique({
                where: { id: groupId },
            });
            if (!group) {
                throw new common_1.NotFoundException(`Group with ID ${groupId} not found`);
            }
            const existingSchedule = await this.prisma.schedule.findUnique({
                where: { groupId },
            });
            if (existingSchedule) {
                throw new common_1.ConflictException(`Schedule for group ${groupId} already exists`);
            }
            return await this.prisma.schedule.create({
                data: {
                    group: {
                        connect: { id: groupId },
                    },
                    days: {
                        create: this.createDaysData(week),
                    },
                },
                include: this.getScheduleInclude(),
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException('Schedule already exists for this group');
                }
            }
            throw new common_1.InternalServerErrorException('Failed to create schedule', error);
        }
    }
    async createMany(createScheduleDtos) {
        try {
            const createdSchedules = await Promise.all(createScheduleDtos.map(async (dto) => this.create(dto)));
            return createdSchedules;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Failed to create multiple schedules');
        }
    }
    async findAll(groupIDs, teacherIDs, lessonIDs) {
        try {
            const where = {};
            if (groupIDs?.length) {
                where.groupId = { in: groupIDs };
            }
            const daysConditions = [];
            if (teacherIDs?.length) {
                daysConditions.push({
                    lessons: {
                        some: {
                            teachers: {
                                some: {
                                    id: { in: teacherIDs },
                                },
                            },
                        },
                    },
                });
            }
            if (lessonIDs?.length) {
                daysConditions.push({
                    lessons: {
                        some: {
                            lessonId: { in: lessonIDs },
                        },
                    },
                });
            }
            if (daysConditions.length) {
                where.days = {
                    some: {
                        AND: daysConditions,
                    },
                };
            }
            return await this.prisma.schedule.findMany({
                where,
                include: this.getScheduleInclude(),
            });
        }
        catch (error) {
            console.error('Error in findAll:', error);
            throw new common_1.InternalServerErrorException('Failed to retrieve schedules');
        }
    }
    async findOne(id) {
        try {
            const schedule = await this.prisma.schedule.findUnique({
                where: { id },
                include: this.getScheduleInclude(),
            });
            if (!schedule) {
                throw new common_1.NotFoundException(`Schedule with ID ${id} not found`);
            }
            return schedule;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to retrieve schedule');
        }
    }
    async update(id, updateScheduleDto) {
        const { groupId, week } = updateScheduleDto;
        try {
            const existingSchedule = await this.prisma.schedule.findUnique({
                where: { id },
            });
            if (!existingSchedule) {
                throw new common_1.NotFoundException(`Schedule with ID ${id} not found`);
            }
            await this.prisma.scheduleDay.deleteMany({
                where: { scheduleId: id },
            });
            return await this.prisma.schedule.update({
                where: { id },
                data: {
                    group: groupId ? { connect: { id: groupId } } : undefined,
                    days: {
                        create: this.createDaysData(week),
                    },
                },
                include: this.getScheduleInclude(),
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Schedule with ID ${id} not found`);
                }
            }
            throw new common_1.InternalServerErrorException('Failed to update schedule');
        }
    }
    async remove(id) {
        try {
            const existingSchedule = await this.prisma.schedule.findUnique({
                where: { id },
            });
            if (!existingSchedule) {
                throw new common_1.NotFoundException(`Schedule with ID ${id} not found`);
            }
            await this.prisma.scheduleDay.deleteMany({
                where: { scheduleId: id },
            });
            return await this.prisma.schedule.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Schedule with ID ${id} not found`);
                }
            }
            throw new common_1.InternalServerErrorException('Failed to remove schedule');
        }
    }
    createDaysData(week) {
        try {
            return week.map((day) => ({
                day: day.day,
                lessons: {
                    create: day.lessons.map((lesson) => ({
                        order: {
                            connect: { id: lesson.orderId },
                        },
                        audiences: lesson.audiences,
                        lesson: {
                            connect: { id: lesson.lessonId },
                        },
                        teachers: {
                            connect: lesson.teacherIds.map((id) => ({ id })),
                        },
                    })),
                },
            }));
        }
        catch {
            throw new common_1.BadRequestException('Invalid week data structure');
        }
    }
    getScheduleInclude() {
        return {
            days: {
                include: {
                    lessons: {
                        include: {
                            lesson: true,
                            teachers: true,
                        },
                        orderBy: {
                            order: {
                                order: 'asc',
                            },
                        },
                    },
                },
                orderBy: {
                    day: 'asc',
                },
            },
            group: {
                include: {
                    speciality: true,
                },
            },
        };
    }
};
exports.ScheduleService = ScheduleService;
exports.ScheduleService = ScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScheduleService);
//# sourceMappingURL=schedule.service.js.map