import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty()
  task: string;

  @Column({ name: 'is_done', type: 'tinyint', width: 1 })
  @ApiProperty()
  IsDone: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createAt: string;

  @UpdateDateColumn({ name: 'uptaded_at' })
  @ApiProperty()
  updateAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deleteAt: string;

  constructor(todo?: Partial<TodoEntity>) {
    this.id = todo?.id;
    this.task = todo?.task;
    this.IsDone = todo?.IsDone;
    this.createAt = todo?.createAt;
    this.deleteAt = todo?.deleteAt;
  }
}
