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
  task: string;

  @Column({ name: 'is_done', type: 'tinyint', width: 1, nullable: true })
  isDone: number;

  @CreateDateColumn({ name: 'created_at' })
  createAdt: string;

  @UpdateDateColumn({ name: 'uptaded_at' })
  updateAdt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleteAdt: string;
}
