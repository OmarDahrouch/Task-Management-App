import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity'; 
import { TaskStatus } from '../tasks/status.enum';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async createTask(title: string, description: string, status: TaskStatus): Promise<Task> {
        const task = this.taskRepository.create({ title, description, status });
        return this.taskRepository.save(task);
      }

    async findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    async findOne(id: number): Promise<Task> {
        return this.taskRepository.findOneBy({ id });
    }

    async update(id: number, updateData: Partial<Task>): Promise<Task> {
        await this.taskRepository.update(id, updateData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.taskRepository.delete(id);
    }
}
