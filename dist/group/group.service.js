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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let GroupService = class GroupService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createGroupDto) {
        const { studentIds, curatorId, specialityId, ...groupData } = createGroupDto;
        try {
            return await this.prisma.group.create({
                data: {
                    ...groupData,
                    curatorId,
                    students: {
                        connect: studentIds?.map((id) => ({ id })),
                    },
                    schedule: {
                        create: {},
                    },
                    specialityId,
                },
                include: {
                    students: true,
                    curator: true,
                    schedule: true,
                },
            });
        }
        catch (error) {
            console.error('Group creation error:', error);
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.BadRequestException('Group with this number already exists');
                }
                if (error.code === 'P2025') {
                    throw new common_1.BadRequestException('Invalid curator or student ID');
                }
            }
            throw new common_1.InternalServerErrorException('Failed to create group');
        }
    }
    async createMany(createGroupDtos) {
        try {
            const numbers = createGroupDtos.map((dto) => dto.number);
            const existingGroups = await this.prisma.group.findMany({
                where: { number: { in: numbers } },
                select: { number: true },
            });
            const existingNumbers = new Set(existingGroups.map((g) => g.number));
            const toCreate = createGroupDtos.filter((dto) => !existingNumbers.has(dto.number));
            if (toCreate.length === 0)
                return [];
            const createdGroups = await Promise.all(toCreate.map(async (dto) => this.create(dto)));
            return createdGroups;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Failed to create multiple groups');
        }
    }
    async findAll() {
        try {
            return await this.prisma.group.findMany({
                include: {
                    curator: true,
                    students: true,
                    speciality: true,
                },
            });
        }
        catch {
            throw new common_1.InternalServerErrorException('Failed to retrieve groups');
        }
    }
    async findOne(id) {
        try {
            const group = await this.prisma.group.findUnique({
                where: { id },
                include: {
                    curator: true,
                    students: true,
                    speciality: true,
                },
            });
            if (!group) {
                throw new common_1.NotFoundException(`Group with ID ${id} not found`);
            }
            return group;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to retrieve group');
        }
    }
    async update(id, updateGroupDto) {
        const { studentIds, curatorId, specialityId, ...groupData } = updateGroupDto;
        try {
            return await this.prisma.group.update({
                where: { id },
                data: {
                    ...groupData,
                    curator: curatorId
                        ? {
                            connect: { id: curatorId },
                        }
                        : undefined,
                    students: studentIds
                        ? {
                            set: studentIds.map((id) => ({ id })),
                        }
                        : undefined,
                    speciality: specialityId
                        ? {
                            connect: { id: specialityId },
                        }
                        : undefined,
                },
                include: {
                    students: true,
                    curator: true,
                    schedule: true,
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Group with ID ${id} not found`);
                }
                if (error.code === 'P2002') {
                    throw new common_1.BadRequestException('Group with this number already exists');
                }
            }
            throw new common_1.InternalServerErrorException('Failed to update group');
        }
    }
    async remove(id) {
        try {
            return await this.prisma.group.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Group with ID ${id} not found`);
                }
            }
            console.log({ error });
            throw new common_1.InternalServerErrorException('Failed to remove group');
        }
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GroupService);
//# sourceMappingURL=group.service.js.map