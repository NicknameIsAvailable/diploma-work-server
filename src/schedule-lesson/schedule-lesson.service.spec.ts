import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleLessonController } from './schedule-lesson.controller';
import { ScheduleLessonService } from './schedule-lesson.service';
import { CreateScheduleLessonDto } from './dto/create-schedule-lesson.dto';
import { UpdateScheduleLessonDto } from './dto/update-schedule-lesson.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

describe('ScheduleLessonController', () => {
  let controller: ScheduleLessonController;
  let service: ScheduleLessonService;

  const mockService = {
    create: jest.fn(),
    createMany: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleLessonController],
      providers: [
        { provide: ScheduleLessonService, useValue: mockService },
        {
          provide: 'APP_GUARD',
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: { verifyAsync: jest.fn(), sign: jest.fn() },
        },
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn() },
        },
        {
          provide: Reflector,
          useValue: { getAllAndOverride: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<ScheduleLessonController>(ScheduleLessonController);
    service = module.get<ScheduleLessonService>(ScheduleLessonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create() should call service.create', async () => {
    const dto: CreateScheduleLessonDto = {
      lessonId: '2',
      orderId: '3',
      teacherIds: ['t1'],
      audiences: ['101'],
    };
    mockService.create.mockResolvedValue({ id: '123', ...dto });

    const result = await controller.create(dto);
    expect(result).toEqual({ id: '123', ...dto });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('createMany() should call service.createMany', async () => {
    const dtos = [
      {
        dayId: '1',
        lessonId: '2',
        orderId: '3',
        teacherIds: ['t1'],
        audiences: ['101'],
      },
    ];
    mockService.createMany.mockResolvedValue([{ id: '123', ...dtos[0] }]);

    const result = await controller.createMany(dtos);
    expect(result).toEqual([{ id: '123', ...dtos[0] }]);
    expect(service.createMany).toHaveBeenCalledWith(dtos);
  });

  it('findAll() should return all schedule lessons', async () => {
    mockService.findAll.mockResolvedValue([{ id: '1' }]);
    const result = await controller.findAll();
    expect(result).toEqual([{ id: '1' }]);
  });

  it('findOne() should return one lesson by id', async () => {
    mockService.findOne.mockResolvedValue({ id: 'abc' });
    const result = await controller.findOne('abc');
    expect(result).toEqual({ id: 'abc' });
  });

  it('update() should call service.update with correct args', async () => {
    const dto: UpdateScheduleLessonDto = { audiences: ['102'] };
    mockService.update.mockResolvedValue({ id: 'abc', ...dto });

    const result = await controller.update('abc', dto);
    expect(result).toEqual({ id: 'abc', ...dto });
    expect(service.update).toHaveBeenCalledWith('abc', dto);
  });

  it('remove() should call service.remove with correct id', async () => {
    mockService.remove.mockResolvedValue({ id: 'to-delete' });
    const result = await controller.remove('to-delete');
    expect(result).toEqual({ id: 'to-delete' });
    expect(service.remove).toHaveBeenCalledWith('to-delete');
  });
});
