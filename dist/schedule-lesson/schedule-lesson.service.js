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
exports.ScheduleLessonService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ScheduleLessonService = class ScheduleLessonService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createScheduleLessonDto) {
        const { teacherIds, lessonId, ...lessonData } = createScheduleLessonDto;
        try {
            const teachers = await this.prisma.user.findMany({
                where: {
                    id: {
                        in: teacherIds,
                    },
                },
            });
            if (teachers.length !== teacherIds.length) {
                throw new common_1.BadRequestException('One or more teacher IDs are invalid');
            }
            return await this.prisma.scheduleLesson.create({
                data: {
                    ...lessonData,
                    lesson: {
                        connect: { id: lessonId },
                    },
                    teachers: {
                        connect: teachers.map((teacher) => ({ id: teacher.id })),
                    },
                },
                include: {
                    teachers: true,
                    lesson: true,
                    scheduleDay: true,
                },
            });
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.BadRequestException('This schedule lesson already exists');
                }
            }
            throw new common_1.InternalServerErrorException('Failed to create schedule lesson');
        }
    }
    async createMany(createScheduleLessonDtos) {
        try {
            const createdLessons = await Promise.all(createScheduleLessonDtos.map(async (dto) => this.create(dto)));
            return createdLessons;
        }
        catch {
            throw new common_1.InternalServerErrorException('Failed to create multiple schedule lessons');
        }
    }
    async findAll(groupIDs, teacherIDs, lessonIDs) {
        try {
            const where = {};
            if (groupIDs && groupIDs.length > 0) {
                where.scheduleDay = {
                    schedule: {
                        groupId: {
                            in: groupIDs,
                        },
                    },
                };
            }
            if (teacherIDs && teacherIDs.length > 0) {
                where.teachers = {
                    some: {
                        id: {
                            in: teacherIDs,
                        },
                    },
                };
            }
            if (lessonIDs && lessonIDs.length > 0) {
                where.lessonId = {
                    in: lessonIDs,
                };
            }
            return await this.prisma.scheduleLesson.findMany({
                where,
                include: {
                    lesson: true,
                    scheduleDay: {
                        include: {
                            schedule: {
                                include: {
                                    group: true,
                                },
                            },
                        },
                    },
                    teachers: true,
                },
            });
        }
        catch (error) {
            console.error('Error in findAll:', error);
            throw new common_1.InternalServerErrorException('Failed to retrieve schedule lessons');
        }
    }
    async findOne(id) {
        try {
            const scheduleLesson = await this.prisma.scheduleLesson.findUnique({
                where: { id },
                include: {
                    lesson: true,
                    scheduleDay: true,
                },
            });
            if (!scheduleLesson) {
                throw new common_1.NotFoundException(`Schedule lesson with ID ${id} not found`);
            }
            return scheduleLesson;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to retrieve schedule lesson');
        }
    }
    async update(id, updateScheduleLessonDto) {
        const { teacherIds, ...lessonData } = updateScheduleLessonDto;
        try {
            if (teacherIds) {
                const teachers = await this.prisma.user.findMany({
                    where: {
                        id: {
                            in: teacherIds,
                        },
                    },
                });
                if (teachers.length !== teacherIds.length) {
                    throw new common_1.BadRequestException('One or more teacher IDs are invalid');
                }
            }
            return await this.prisma.scheduleLesson.update({
                where: { id },
                data: {
                    ...lessonData,
                    teachers: teacherIds
                        ? {
                            set: teacherIds.map((id) => ({ id })),
                        }
                        : undefined,
                },
                include: {
                    teachers: true,
                    lesson: true,
                },
            });
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Schedule lesson with ID ${id} not found`);
                }
            }
            throw new common_1.InternalServerErrorException('Failed to update schedule lesson');
        }
    }
    async remove(id) {
        try {
            return await this.prisma.scheduleLesson.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Schedule lesson with ID ${id} not found`);
                }
            }
            throw new common_1.InternalServerErrorException('Failed to remove schedule lesson');
        }
    }
};
exports.ScheduleLessonService = ScheduleLessonService;
exports.ScheduleLessonService = ScheduleLessonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScheduleLessonService);
//# sourceMappingURL=schedule-lesson.service.js.map