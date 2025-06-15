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
exports.SpecialityService = void 0;
const prisma_service_1 = require("./../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let SpecialityService = class SpecialityService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createSpecialityDto) {
        return this.prisma.speciality.create({ data: createSpecialityDto });
    }
    findAll() {
        return this.prisma.speciality.findMany({
            include: {
                groups: true,
                location: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.speciality.findUnique({
            where: { id },
            include: {
                groups: true,
                location: true,
            },
        });
    }
    update(id, updateSpecialityDto) {
        return this.prisma.speciality.update({
            where: { id },
            data: updateSpecialityDto,
            include: {
                groups: true,
                location: true,
            },
        });
    }
    async createMany(createSpecialityDtos) {
        return this.prisma.speciality.createMany({
            data: createSpecialityDtos,
            skipDuplicates: true,
        });
    }
    remove(id) {
        return this.prisma.speciality.delete({
            where: { id },
            include: {
                groups: true,
                location: true,
            },
        });
    }
};
exports.SpecialityService = SpecialityService;
exports.SpecialityService = SpecialityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SpecialityService);
//# sourceMappingURL=speciality.service.js.map