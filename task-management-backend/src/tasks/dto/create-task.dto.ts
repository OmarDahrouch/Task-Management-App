import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the task' })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The status of the task',
    enum: ['To Do', 'In Progress', 'Done'],
  })
  @IsEnum(['To Do', 'In Progress', 'Done'])
  status: 'To Do' | 'In Progress' | 'Done';
}
