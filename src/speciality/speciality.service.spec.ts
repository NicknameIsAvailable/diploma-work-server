import { Test, TestingModule } from '@nestjs/testing';
import { SpecialityService } from './speciality.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SpecialityService', () => {
  let service: SpecialityService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpecialityService,
        {
          provide: PrismaService,
          useValue: {
            speciality: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              createMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<SpecialityService>(SpecialityService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create speciality', async () => {
    const dto = { name: 'Test' };
    (prisma.speciality.create as jest.Mock).mockResolvedValue(dto);
    const result = await service.create(dto as any);
    expect(result).toEqual(dto);
    expect(prisma.speciality.create).toHaveBeenCalledWith({ data: dto });
  });

  it('should return all specialities', async () => {
    const list = [{ id: '1', name: 'One' }];
    (prisma.speciality.findMany as jest.Mock).mockResolvedValue(list);
    const result = await service.findAll();
    expect(result).toEqual(list);
  });

  it('should return one speciality by id', async () => {
    const item = { id: '123', name: 'Spec' };
    (prisma.speciality.findUnique as jest.Mock).mockResolvedValue(item);
    const result = await service.findOne('123');
    expect(result).toEqual(item);
  });

  it('should update speciality', async () => {
    const updated = { id: '123', name: 'Updated' };
    (prisma.speciality.update as jest.Mock).mockResolvedValue(updated);
    const result = await service.update('123', { title: 'Updated' });
    expect(result).toEqual(updated);
  });

  it('should delete speciality', async () => {
    (prisma.speciality.delete as jest.Mock).mockResolvedValue({ id: 'del' });
    const result = await service.remove('del');
    expect(result).toEqual({ id: 'del' });
  });

  it('should create many', async () => {
    const dtos = [{ name: 'One' }, { name: 'Two' }];
    (prisma.speciality.createMany as jest.Mock).mockResolvedValue({ count: 2 });
    const result = await service.createMany(dtos as any);
    expect(result).toEqual({ count: 2 });
  });
});
