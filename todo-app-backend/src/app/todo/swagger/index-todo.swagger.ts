import { OmitType } from '@nestjs/swagger';
import { TodoEntity } from '../entity/todo.entity';

export class IndexTodoSwagger extends OmitType(TodoEntity, [
  'createAt',
  'updateAt',
  'deleteAt',
]) {}
