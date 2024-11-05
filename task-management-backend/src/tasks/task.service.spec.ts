import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './status.enum';

describe('TaskService', () => {
  let service: TaskService;
  let repo: Repository<Task>;

  const mockTaskRepository = {
    create: jest.fn().mockReturnValue({ id: 1, title: 'Test Task' }),
    save: jest.fn().mockResolvedValue({ id: 1, title: 'Test Task' }),
    find: jest.fn().mockResolvedValue([{ id: 1, title: 'Test Task' }]),
    findOneBy: jest.fn().mockResolvedValue({ id: 1, title: 'Test Task' }),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repo = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const result = await service.createTask('Test Task', 'Task Description', TaskStatus.TODO);
    expect(result).toEqual({ id: 1, title: 'Test Task' });
    expect(repo.create).toHaveBeenCalled();
    expect(repo.save).toHaveBeenCalled();
  });

  it('should find all tasks', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id: 1, title: 'Test Task' }]);
    expect(repo.find).toHaveBeenCalled();
  });

});
