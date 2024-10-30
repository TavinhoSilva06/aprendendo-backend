import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  HttpStatus,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { get } from 'http';

@Controller('api/v1/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async index() {
    return await this.todoService.findAll();
  }

  @Post()
  async create(@Body() Body) {
    return await this.todoService.create(Body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body) {
    return await this.todoService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.todoService.deleteById(id);
  }
}
