import { Test, TestingModule } from '@nestjs/testing';
import { LessonOrderService } from './lesson-order.service';
import { PrismaService } from 'src/prisma/prisma.service';

class FakePrismaService {
  lessonOrder = {
    create: async ({ data }: any) => ({ id: '1', ...data }),
    findMany: async () => [{ id: '1', name: 'Порядок 1' }],
    findUnique: async ({ where }: any) =>
      where.id === '1' ? { id: '1' } : null,
    update: async ({ where, data }: any) => ({ id: where.id, ...data }),
    delete: async ({ where }: any) => ({ id: where.id }),
  };
}

describe('LessonOrderService', () => {
  let service: LessonOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonOrderService,
        {
          provide: PrismaService,
          useClass: FakePrismaService,
        },
      ],
    }).compile();

    service = module.get<LessonOrderService>(LessonOrderService);
  });

  it('should create lesson order', async () => {
    const result = await service.create({
      order: 1,
      startTime: '09:00',
      endTime: '10:00',
    });
    expect(result.order).toBe('Test');
  });

  it('should return all orders', async () => {
    const result = await service.findAll();
    expect(result).toHaveLength(1);
  });

  it('should return one order by id', async () => {
    const result = await service.findOne('1');
    expect(result.id).toBe('1');
  });

  it('should update order', async () => {
    const result = await service.update('1', { order: 1 });
    expect(result.order).toBe('Updated');
  });

  it('should delete order', async () => {
    const result = await service.remove('1');
    expect(result.id).toBe('1');
  });
});
