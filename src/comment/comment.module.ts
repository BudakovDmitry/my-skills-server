import { Module } from '@nestjs/common';
import { CommentService } from './comment.service.js';
import { CommentController } from './comment.controller.js';
import { PrismaService } from '../prisma.service.js';
import { CommentGateway } from './comment.gateway.js';

@Module({
  controllers: [CommentController],
  providers: [CommentService, PrismaService, CommentGateway],
})
export class CommentModule {}
