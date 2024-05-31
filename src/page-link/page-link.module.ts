import { Module } from '@nestjs/common';
import { PageLinkService } from './page-link.service.js';
import { PageLinkController } from './page-link.controller.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [PageLinkController],
  providers: [PageLinkService, PrismaService],
})
export class PageLinkModule {}
