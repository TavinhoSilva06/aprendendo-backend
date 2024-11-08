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
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexTodoSwagger } from './swagger/index-todo.swagger';

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas retornada com sucesso',
    type: IndexTodoSwagger,
    isArray: true,
  })
  async index() {
    return await this.todoService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar uma nova tarefa' })
  @ApiResponse({ status: 201, description: 'Nova tarefa criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Parâmetros invalidos' })
  async create(@Body() Body: CreateTodoDto) {
    return await this.todoService.create(Body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Exibif=r dados de uma tarefa' })
  @ApiResponse({
    status: 200,
    description: 'Dados de uma tarefa retornada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Task não foi encontrado' })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar dados de uma tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Task não foi encontrado' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTodoDto,
  ) {
    return await this.todoService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma tarefa' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Tarefa removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Task não foi encontrado' })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.todoService.deleteById(id);
  }
}
