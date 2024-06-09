import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CommentDto } from './dto/comment.dto.js';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CommentDto) {
    return this.prisma.comment.create({
      data: {
        text: dto.text,
        author: {
          connect: { id: dto.authorId },
        },
        recipient: {
          connect: { id: dto.recipientId },
        },
      },
    });
  }

  // findAll() {
  //   return `This action returns all comment`;
  // }

  // findOne(id: string) {
  //   return `This action returns a #${id} comment`;
  // }

  // update(id: string, updateCommentDto) {
  //   return `This action updates a #${id} comment`;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} comment`;
  // }
}
