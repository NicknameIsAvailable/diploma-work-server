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
exports.LessonOrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LessonOrderService = class LessonOrderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createLessonOrderDto) {
        return this.prisma.lessonOrder.create({ data: createLessonOrderDto });
    }
    async createMany(createLessonOrderDtos) {
        const orders = createLessonOrderDtos.map((dto) => dto.order);
        const existingOrders = await this.prisma.lessonOrder.findMany({
            where: { order: { in: orders } },
            select: { order: true },
        });
        const existingOrderSet = new Set(existingOrders.map((o) => o.order));
        const toCreate = createLessonOrderDtos.filter((dto) => !existingOrderSet.has(dto.order));
        if (toCreate.length === 0)
            return [];
        return this.prisma.lessonOrder.createMany({
            data: toCreate,
            skipDuplicates: true,
        });
    }
    findAll() {
        return this.prisma.lessonOrder.findMany();
    }
    findOne(id) {
        return this.prisma.lessonOrder.findUnique({ where: { id } });
    }
    update(id, updateLessonOrderDto) {
        return this.prisma.lessonOrder.update({
            where: { id },
            data: updateLessonOrderDto,
        });
    }
    remove(id) {
        return this.prisma.lessonOrder.delete({ where: { id } });
    }
};
exports.LessonOrderService = LessonOrderService;
exports.LessonOrderService = LessonOrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LessonOrderService);
//# sourceMappingURL=lesson-order.service.js.map