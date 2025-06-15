import { Test, TestingModule } from '@nestjs/testing';
import { LessonService } from './lesson.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

class FakePrismaService {
  lesson = {
    create: async ({ data }: any) => {
      if (data.label === 'exists') {
        const error = new Error();
        (error as any).code = 'P2002'; // simulate unique constraint violation
        throw error;
      }
      return { id: '1', ...data };
    },
    createMany: async ({ data }: any) => ({ count: data.length }),
    findMany: async () => [{ id: '1', label: 'lesson1' }],
    findUnique: async ({ where }: any) =>
      where.id === '1' ? { id: '1', label: 'lesson1' } : null,
    update: async ({ where, data }: any) => {
      if (where.id !== '1') {
        const error = new Error();
        (error as any).code = 'P2025'; // simulate not found
        throw error;
      }
      return { id: where.id, ...data };
    },
    delete: async ({ where }: any) => {
      if (where.id !== '1') {
        const error = new Error();
        (error as any).code = 'P2025'; // simulate not found
        throw error;
      }
      return { id: where.id };
    },
  };
}

describe('LessonService', () => {
  let service: LessonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonService,
        {
          provide: PrismaService,
          useClass: FakePrismaService,
        },
      ],
    }).compile();

    service = module.get<LessonService>(LessonService);
  });

  it('should create a lesson', async () => {
    const lesson = await service.create({ label: 'new lesson' } as any);
    expect(lesson).toHaveProperty('id');
  });

  it('should throw on duplicate lesson create', async () => {
    await expect(service.create({ label: 'exists' } as any)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should create many lessons', async () => {
    const res = await service.createMany([
      { label: 'l1' },
      { label: 'l2' },
    ] as any);
    expect(res.length).toBe(2);
  });

  it('should find all lessons', async () => {
    const lessons = await service.findAll();
    expect(Array.isArray(lessons)).toBe(true);
    expect(lessons[0]).toHaveProperty('id');
  });

  it('should find one lesson', async () => {
    const lesson = await service.findOne('1');
    expect(lesson).toHaveProperty('id', '1');
  });

  it('should throw if lesson not found', async () => {
    await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should update lesson', async () => {
    const updated = await service.update('1', { label: 'updated' } as any);
    expect(updated.label).toBe('updated');
  });

  it('should throw if update non-existing lesson', async () => {
    await expect(service.update('999', { label: 'x' } as any)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should remove lesson', async () => {
    const removed = await service.remove('1');
    expect(removed).toHaveProperty('id', '1');
  });

  it('should throw if remove non-existing lesson', async () => {
    await expect(service.remove('999')).rejects.toThrow(NotFoundException);
  });
});
