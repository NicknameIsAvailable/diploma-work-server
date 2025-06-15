import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

class FakePrismaService {
  location = {
    create: async (args: any) => ({ id: 'loc1', ...args.data }),
    createMany: async (args: any) => ({ count: args.data.length }),
    findMany: async () => [{ id: 'loc1', name: 'Test' }],
    findUnique: async ({ where }: any) => {
      if (where.id === 'exists') return { id: 'exists', name: 'Location' };
      return null;
    },
    update: async ({ where, data }: any) => ({ id: where.id, ...data }),
    delete: async ({ where }: any) => ({ id: where.id }),
  };
}

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: PrismaService,
          useClass: FakePrismaService,
        },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should create location', async () => {
    const dto = { name: 'Test Location' };
    const result = await service.create(dto as any);
    expect(result.title).toBe('Test Location');
  });

  it('should return all locations', async () => {
    const result = await service.findAll();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should find one by id', async () => {
    const result = await service.findOne('exists');
    expect(result.title).toBe('Location');
  });

  it('should throw if location not found', async () => {
    await expect(service.findOne('not-exist')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should update location', async () => {
    const result = await service.update('exists', { title: 'Updated' });
    expect(result.title).toBe('Updated');
  });

  it('should delete location', async () => {
    const result = await service.remove('exists');
    expect(result.id).toBe('exists');
  });
});
