import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoEntity } from './entity/todo.entity';
import { find, merge } from 'rxjs';
import { FindRelationsNotFoundError, Repository } from 'typeorm';
import { create } from 'domain';
import { NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import exp from 'constants';
import { UpdateTodoDto } from './dto/update-todo.dto';

const todoEntityList: TodoEntity[] = [
  new TodoEntity({ task: 'task-1', IsDone: 0 }),
  new TodoEntity({ task: 'task-2', IsDone: 0 }),
  new TodoEntity({ task: 'task-3', IsDone: 0 }),
];

const UpdatedTodoEntityItem = new TodoEntity({ task: 'task-1', IsDone: 1 });

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository: Repository<TodoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(TodoEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(todoEntityList),
            findOneById: jest.fn().mockResolvedValue(todoEntityList[0]),
            create: jest.fn().mockReturnValue(todoEntityList[0]),
            merge: jest.fn().mockReturnValue(UpdatedTodoEntityItem),
            save: jest.fn().mockResolvedValue(todoEntityList[0]),
            softDelete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    todoRepository = module.get<Repository<TodoEntity>>(
      getRepositoryToken(TodoEntity),
    );
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
    expect(todoRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a todo entity list successfully', async () => {
      // Act
      const result = await todoService.findAll();

      //Assert
      expect(result).toEqual(todoEntityList);
      expect(todoRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(todoRepository, 'find').mockRejectedValueOnce(new Error());

      //Assert
      expect(todoService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a todo item successfully', async () => {
      // Act
      const result = await todoService.findOne('1');

      // Assert
      expect(result).toEqual(todoEntityList[0]);
      expect(todoRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      // Arrange
      jest.spyOn(todoRepository, 'findOne').mockRejectedValueOnce(new Error());

      // Assert
      expect(todoService.findOne('1')).rejects.toThrowError(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new todo item succesfully', async () => {
      // Arrange
      const data: CreateTodoDto = {
        task: 'task-1',
        IsDone: 0,
      };

      // Act
      const result = await todoService.create(data);

      // Assert
      expect(result).toEqual(todoEntityList[0]);
      expect(todoRepository.create).toHaveBeenCalledTimes(1);
      expect(todoRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      const data: CreateTodoDto = {
        task: 'task-1',
        IsDone: 0,
      };

      jest.spyOn(todoRepository, 'save').mockRejectedValueOnce(new Error());

      // Assert
      expect(todoService.create(data)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a todo entity item successfully', async () => {
      //Arrange
      const data: UpdateTodoDto = {
        task: 'task-1',
        IsDone: 1,
      };

      jest
        .spyOn(todoRepository, 'save')
        .mockResolvedValueOnce(UpdatedTodoEntityItem);

      // Act
      const result = await todoService.update('1', data);

      // Assert
      expect(result).toEqual(UpdatedTodoEntityItem);
    });

    it('should trhow a not found exception', () => {
      // Arrange
      jest.spyOn(todoRepository, 'findOne').mockRejectedValueOnce(new Error());

      const data: UpdateTodoDto = {
        task: 'task-1',
        IsDone: 1,
      };

      // Assert
      expect(todoService.update('1', data)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw a excepetion', () => {
      // Arrange
      jest.spyOn(todoRepository, 'save').mockRejectedValueOnce(new Error());

      const data: UpdateTodoDto = {
        task: 'task-1',
        IsDone: 1,
      };

      // Assert
      expect(todoService.update('1', data)).rejects.toThrowError();
    });
  });

  describe('deleteById', () => {
    it('should delete a todo entity item successfully', async () => {
      // Act
      const result = await todoService.deleteById('1');

      // Assert
      expect(result).toBeUndefined();
      expect(todoRepository.findOne).toHaveBeenCalledTimes(1);
      expect(todoRepository.softDelete).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      // Arrange
      jest.spyOn(todoRepository, 'findOne').mockRejectedValueOnce(new Error());

      // Assert
      expect(todoService.deleteById('1')).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw an excepetion', () => {
      // Arrange
      jest
        .spyOn(todoRepository, 'softDelete')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(todoService.deleteById('1')).rejects.toThrowError();
    });
  });
});
