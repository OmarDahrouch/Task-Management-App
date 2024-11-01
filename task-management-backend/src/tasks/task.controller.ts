import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' }) 
  @ApiResponse({ status: 201, description: 'The task has been successfully created.' }) 
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto.title, createTaskDto.description, createTaskDto.status);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tasks' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of tasks.', type: [Task] })
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a task by ID' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of the task.', type: Task })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async findOne(@Param('id') id: number): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiResponse({ status: 200, description: 'The task has been successfully updated.', type: Task })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async update(@Param('id') id: number, @Body() updateTaskDto: Partial<Task>): Promise<Task> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiResponse({ status: 204, description: 'The task has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.taskService.remove(id);
  }
}