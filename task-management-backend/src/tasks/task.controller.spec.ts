import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskStatus } from './status.enum';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  const mockTaskService = {
    createTask: jest.fn().mockResolvedValue({ id: 1, title: 'Test Task' }),
    findAll: jest.fn().mockResolvedValue([{ id: 1, title: 'Test Task' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', async () => {
    const result = await controller.create({ title: 'Test Task', description: 'Task Description', status: TaskStatus.TODO });
    expect(result).toEqual({ id: 1, title: 'Test Task' });
    expect(service.createTask).toHaveBeenCalled();
  });

  it('should return all tasks', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, title: 'Test Task' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

});
