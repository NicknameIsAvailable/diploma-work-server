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
exports.LessonService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let LessonService = class LessonService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createLessonDto) {
        try {
            return await this.prisma.lesson.create({
                data: createLessonDto,
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.BadRequestException('Lesson with this label already exists');
                }
            }
            throw new common_1.InternalServerErrorException('Failed to create lesson');
        }
    }
    async createMany(data) {
        try {
            return await this.prisma.lesson.createMany({
                data,
            });
        }
        catch {
            throw new common_1.InternalServerErrorException('Failed to create multiple lessons');
        }
    }
    async findAll() {
        try {
            return await this.prisma.lesson.findMany({});
        }
        catch {
            throw new common_1.InternalServerErrorException('Failed to retrieve lessons');
        }
    }
    async findOne(id) {
        try {
            const lesson = await this.prisma.lesson.findUnique({
                where: { id },
            });
            if (!lesson) {
                throw new common_1.NotFoundException(`Lesson with ID ${id} not found`);
            }
            return lesson;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to retrieve lesson');
        }
    }
    async update(id, updateLessonDto) {
        try {
            return await this.prisma.lesson.update({
                where: { id },
                data: updateLessonDto,
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Lesson with ID ${id} not found`);
                }
            }
            throw new common_1.InternalServerErrorException('Failed to update lesson');
        }
    }
    async remove(id) {
        try {
            return await this.prisma.lesson.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Lesson with ID ${id} not found`);
                }
            }
            throw new common_1.InternalServerErrorException('Failed to remove lesson');
        }
    }
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LessonService);
//# sourceMappingURL=lesson.service.js.map