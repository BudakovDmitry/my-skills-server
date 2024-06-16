import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { TodoService } from './todo.service.js';
import { TodoDto } from './dto/todo.dto.js';
import { CurrentUser } from '../auth/decorators/user.decorator.js';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @HttpCode(200)
  @Post()
  create(@Body() createTodoDto: TodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @HttpCode(200)
  @Get(':id')
  getAllByUserId(@Param('id') id: string) {
    return this.todoService.getAllByUserId(id);
  }

  @HttpCode(200)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: TodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
