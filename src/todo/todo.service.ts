import { Injectable } from '@nestjs/common';
import { TodoDto } from './dto/todo.dto.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: TodoDto) {
    return this.prisma.todo.create({
      data: dto
    });
  }

  async getAllByUserId(id: string) {
    return this.prisma.todo.findMany({
      where: {
        userId: id
      }
    });
  }

  async update(id: string, dto: TodoDto) {
    return this.prisma.todo.update({
      where: {
        id
      },
      data: dto
    });
  }

  async remove(id: string) {
    return this.prisma.todo.delete({
      where: {
        id
      }
    });
  }
}
