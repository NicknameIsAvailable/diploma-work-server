import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    create(createLocationDto: CreateLocationDto): Promise<{
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        title: string;
        address: string;
        code: string;
        description: string | null;
    }>;
    createMany(createLocationDtos: CreateLocationDto[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
    findAll(): Promise<{
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        title: string;
        address: string;
        code: string;
        description: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        title: string;
        address: string;
        code: string;
        description: string | null;
    }>;
    update(id: string, updateLocationDto: UpdateLocationDto): Promise<{
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        title: string;
        address: string;
        code: string;
        description: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        updatedAt: Date | null;
        createdAt: Date;
        title: string;
        address: string;
        code: string;
        description: string | null;
    }>;
}
