import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TaskStatus } from '../tasks/status.enum';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: 'enum', 
        enum: TaskStatus, 
        default: TaskStatus.TODO, 
    })
    status: TaskStatus; 
}