import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { Task } from '../entities/task.entity';
import { TaskController } from './task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskService],
  controllers: [TaskController], // Add the controller here
  exports: [TaskService], // Export TaskService if you want to use it in other modules
})
export class TaskModule {}
