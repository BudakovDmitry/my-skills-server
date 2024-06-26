import { Module } from '@nestjs/common';
import { MailService } from './mail.service.js';
import { MailController } from './mail.controller.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [MailController],
  providers: [MailService, PrismaService],
  exports: [MailService]
})
export class MailModule {}
