import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { MailDto, MailPurpose } from './dto/mail.dto.js';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private prisma: PrismaService, private readonly mailerService: MailerService) {}

  async create(dto: MailDto) {
    return this.prisma.mail.create({
      data: dto
    })
  }

  async findOne(id: string) {
    return this.prisma.mail.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: string, dto: MailDto) {
    return this.prisma.mail.update({
      where: {
        id
      },
      data: dto
    });
  }
  async remove(id: string) {
    return this.prisma.mail.delete({
      where: {
        id
      }
    });
  }

  async sendWelcomeEmail(email: string) {
    const mail = await this.prisma.mail.findFirst({
      where: { purpose: MailPurpose.Registration },
    });

    if (mail) {
      await this.mailerService.sendMail({
        to: email,
        subject: mail.name,
        html: mail.content,
      });
    }
  }

  async sendNotificationEmail(email: string) {
    const mail = await this.prisma.mail.findFirst({
      where: { purpose: MailPurpose.Notification },
    });

    if (mail) {
      await this.mailerService.sendMail({
        to: email,
        subject: mail.name,
        html: mail.content,
      });
    }
  }
}
