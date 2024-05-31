import { Module } from '@nestjs/common';
import { PageService } from './page.service.js';
import { PageController } from './page.controller.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [PageController],
  providers: [PageService, PrismaService],
})
export class PageModule {}
