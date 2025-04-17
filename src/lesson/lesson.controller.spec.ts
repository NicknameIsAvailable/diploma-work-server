import { Test, TestingModule } from '@nestjs/testing';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { NotFoundException } from '@nestjs/common';

describe('LessonController', () => {
  let controller: LessonController;
  let service: LessonService;

  // Тестовые данные
  const mockLesson = {
    id: '1',
    label: 'Математика',
    description: 'Базовый курс математики',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCreateLessonDto: CreateLessonDto = {
    label: 'Математика',
    description: 'Базовый курс математики',
  };

  const mockUpdateLessonDto: UpdateLessonDto = {
    label: 'Обновленная математика',
  };

  // Мок сервиса
  const mockLessonService = {
    create: jest.fn().mockResolvedValue(mockLesson),
    createMany: jest.fn().mockResolvedValue([mockLesson]),
    findAll: jest.fn().mockResolvedValue([mockLesson]),
    findOne: jest.fn().mockResolvedValue(mockLesson),
    update: jest.fn().mockResolvedValue(mockLesson),
    remove: jest.fn().mockResolvedValue({ message: 'Урок успешно удален' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonController],
      providers: [
        {
          provide: LessonService,
          useValue: mockLessonService,
        },
      ],
    }).compile();

    controller = module.get<LessonController>(LessonController);
    service = module.get<LessonService>(LessonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new lesson', async () => {
      const result = await controller.create(mockCreateLessonDto);
      expect(result).toEqual(mockLesson);
      expect(service.create).toHaveBeenCalledWith(mockCreateLessonDto);
    });

    it('should throw an error if creation fails', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
      await expect(controller.create(mockCreateLessonDto)).rejects.toThrow();
    });
  });

  describe('createMany', () => {
    it('should create multiple lessons', async () => {
      const result = await controller.createMany([mockCreateLessonDto]);
      expect(result).toEqual([mockLesson]);
      expect(service.createMany).toHaveBeenCalledWith([mockCreateLessonDto]);
    });

    it('should throw an error if bulk creation fails', async () => {
      jest.spyOn(service, 'createMany').mockRejectedValueOnce(new Error());
      await expect(
        controller.createMany([mockCreateLessonDto]),
      ).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of lessons', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockLesson]);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return empty array if no lessons found', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([]);
      const result = await controller.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a single lesson', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockLesson);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if lesson not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(controller.findOne('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a lesson', async () => {
      const result = await controller.update('1', mockUpdateLessonDto);
      expect(result).toEqual(mockLesson);
      expect(service.update).toHaveBeenCalledWith('1', mockUpdateLessonDto);
    });

    it('should throw NotFoundException if lesson not found', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(
        controller.update('999', mockUpdateLessonDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a lesson', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual({ message: 'Урок успешно удален' });
      expect(service.remove).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if lesson not found', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
