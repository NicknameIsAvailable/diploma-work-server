import { SpecialityService } from './speciality.service';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
export declare class SpecialityController {
    private readonly specialityService;
    constructor(specialityService: SpecialityService);
    create(createSpecialityDto: CreateSpecialityDto): Promise<CreateSpecialityDto> | any;
    createMany(createSpecialityDtos: CreateSpecialityDto[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
    findAll(): Promise<CreateSpecialityDto[]> | any;
    findOne(id: string): Promise<CreateSpecialityDto> | any;
    update(id: string, updateSpecialityDto: UpdateSpecialityDto): Promise<CreateSpecialityDto> | any;
    remove(id: string): Promise<any>;
}
