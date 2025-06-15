import { PrismaService } from './../prisma/prisma.service';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
export declare class SpecialityService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createSpecialityDto: CreateSpecialityDto): import("@prisma/client").Prisma.Prisma__SpecialityClient<{
        number: string;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        code: string;
        locationId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        location: {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            code: string;
            address: string;
        };
        groups: {
            number: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            curatorId: string | null;
            endYear: number | null;
            specialityId: string | null;
            startYear: number | null;
            course: number;
        }[];
    } & {
        number: string;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        code: string;
        locationId: string | null;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__SpecialityClient<{
        location: {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            code: string;
            address: string;
        };
        groups: {
            number: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            curatorId: string | null;
            endYear: number | null;
            specialityId: string | null;
            startYear: number | null;
            course: number;
        }[];
    } & {
        number: string;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        code: string;
        locationId: string | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateSpecialityDto: UpdateSpecialityDto): import("@prisma/client").Prisma.Prisma__SpecialityClient<{
        location: {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            code: string;
            address: string;
        };
        groups: {
            number: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            curatorId: string | null;
            endYear: number | null;
            specialityId: string | null;
            startYear: number | null;
            course: number;
        }[];
    } & {
        number: string;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        code: string;
        locationId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createMany(createSpecialityDtos: CreateSpecialityDto[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__SpecialityClient<{
        location: {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            code: string;
            address: string;
        };
        groups: {
            number: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            curatorId: string | null;
            endYear: number | null;
            specialityId: string | null;
            startYear: number | null;
            course: number;
        }[];
    } & {
        number: string;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        code: string;
        locationId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
