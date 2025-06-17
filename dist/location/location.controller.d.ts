import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    create(createLocationDto: CreateLocationDto): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        code: string;
        address: string;
    }>;
    createMany(createLocationDtos: CreateLocationDto[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
    findAll(): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        code: string;
        address: string;
    }[]>;
    findOne(id: string): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        code: string;
        address: string;
    }>;
    update(id: string, updateLocationDto: UpdateLocationDto): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        code: string;
        address: string;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        code: string;
        address: string;
    }>;
}
