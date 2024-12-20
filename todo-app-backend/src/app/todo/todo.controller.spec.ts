import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoEntity } from './entity/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Body } from '@nestjs/common';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { todo } from 'node:test';

const todoEntityList: TodoEntity[] = [
  new TodoEntity({ id: '1', task: 'task-1', IsDone: 0 }),
  new TodoEntity({ id: '2', task: 'task-2', IsDone: 0 }),
  new TodoEntity({ id: '3', task: 'task-3', IsDone: 0 }),
];

const newTodoEntity = new TodoEntity({ task: 'new-task', IsDone: 0 });

const updatedTodoEntity = new TodoEntity({ task: 'task-1', IsDone: 1 });

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(todoEntityList),
            create: jest.fn().mockResolvedValue(newTodoEntity),
            findOne: jest.fn().mockResolvedValue(todoEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedTodoEntity),
            deleteById: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
    expect(todoService).toBeDefined();
  });

  describe('index', () => {
    it('should return a list entity successfuly', async () => {
      // Act
      const result = await todoController.index();

      // Assert
      expect(result).toEqual([todoEntityList]);
      expect(typeof result).toEqual('object');
      expect(todoService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(todoService, 'findAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(todoController.index()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new todo item successufully', async () => {
      // Arrange
      const body: CreateTodoDto = {
        task: 'new-task',
        IsDone: 0,
      };

      // Act
      const result = await todoController.create(body);

      // Assert
      expect(result).toEqual(newTodoEntity);
      expect(todoService.create).toHaveBeenCalledTimes(1);
      expect(todoService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: CreateTodoDto = {
        task: 'new-task',
        IsDone: 0,
      };

      jest.spyOn(todoService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(todoController.create(body)).rejects.toThrowError();
    });
  });

  describe('show', () => {
    it('should get a todo item successfully', async () => {
      // Act
      const result = await todoController.show('1');

      // Assert
      expect(result).toEqual(todoEntityList[0]);
      expect(todoService.findOne).toHaveBeenCalledTimes(1);
      expect(todoService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw be an exception', () => {
      // Arrange
      jest.spyOn(todoService, 'findOne').mockRejectedValueOnce(new Error());

      // Assert
      expect(todoController.show('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a todo item successfully', async () => {
      // Arrange
      const body: UpdateTodoDto = {
        task: 'task-1',
        IsDone: 1,
      };

      // Act
      const result = await todoController.update('1', body);

      // Assert
      expect(result).toEqual(updatedTodoEntity);
      expect(todoService.update).toHaveBeenCalledTimes(1);
      expect(todoService.update).toHaveBeenCalledWith('1', body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: UpdateTodoDto = {
        task: 'task-1',
        IsDone: 1,
      };

      jest.spyOn(todoService, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(todoController.update('1', body)).rejects.toThrowError();
    });
  });

  describe('destroy', () => {
    it('should be remove a todo item successfully', async () => {
      // Act
      const result = await todoController.destroy('1');

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(todoService, 'deleteById').mockRejectedValueOnce(new Error());

      // Assert
      expect(todoController.destroy('1')).rejects.toThrowError();
    });
  });
});
