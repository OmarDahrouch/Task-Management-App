import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../status.enum';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the task' })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The status of the task',
    enum: ['to_do', 'in_progress', 'done'],
  })
  @IsEnum(TaskStatus,)
  status: TaskStatus;
}
