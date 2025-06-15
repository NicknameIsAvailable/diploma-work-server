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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const auth_service_1 = require("../auth/auth.service");
const rxjs_1 = require("rxjs");
const argon2_1 = require("argon2");
let UserService = class UserService {
    constructor(prisma, authService) {
        this.prisma = prisma;
        this.authService = authService;
    }
    async create(createUserDto) {
        const { name, surname, login, email, password, repeatPassword, groupId, role, } = createUserDto;
        if (password !== repeatPassword) {
            throw new Error('Passwords do not match');
        }
        if (groupId) {
            const groupExists = await this.prisma.group.findUnique({
                where: { id: groupId },
            });
            if (!groupExists) {
                throw new Error(`Group with ID ${groupId} does not exist`);
            }
        }
        return await this.prisma.user.create({
            data: {
                name,
                surname,
                login,
                email,
                role,
                passwordHash: await (0, argon2_1.hash)(password),
                studentGroup: groupId ? { connect: { id: groupId } } : undefined,
            },
        });
    }
    async createMany(createUserDtos) {
        return (0, rxjs_1.from)(createUserDtos)
            .pipe((0, rxjs_1.mergeMap)((dto) => (0, rxjs_1.from)(this.authService.register(dto)).pipe((0, rxjs_1.map)((createdUser) => {
            return createdUser;
        }))), (0, rxjs_1.toArray)())
            .toPromise();
    }
    findAll(query) {
        return this.prisma.user.findMany({
            where: {
                ...query,
            },
            include: {
                studentGroup: {
                    include: {
                        curator: true,
                        speciality: true,
                    },
                },
                curatedGroups: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                studentGroup: {
                    include: {
                        curator: true,
                        speciality: true,
                    },
                },
                curatedGroups: true,
            },
        });
    }
    async findByLogin(login) {
        return this.prisma.user.findUnique({
            where: { login },
        });
    }
    async update(id, updateUserDto) {
        const { groupId, ...userData } = updateUserDto;
        return this.prisma.user.update({
            where: { id },
            data: {
                ...userData,
                studentGroup: groupId ? { connect: { id: groupId } } : undefined,
            },
            include: {
                studentGroup: true,
                curatedGroups: true,
            },
        });
    }
    remove(id) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
    async removeMany(userIds) {
        return this.prisma.user.deleteMany({
            where: {
                id: {
                    in: userIds,
                },
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_service_1.AuthService])
], UserService);
//# sourceMappingURL=user.service.js.map