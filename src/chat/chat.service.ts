import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { ChatDto } from './dto/chat.dto.js';
import { MessageDto } from './dto/message.dto.js';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}
  
  async createChat(dto: ChatDto) {
    return this.prisma.chat.create({
      data: {
        users: {
          create: dto.users.map(userId => ({
            user: { 
              connect: { 
                id: userId 
              } 
            }
          })),
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });
  }

  async createMessage(createMessageDto: MessageDto) {
    const { userId, chatId, content } = createMessageDto;

    return this.prisma.message.create({
      data: {
        content,
        user: {
          connect: { 
            id: userId 
          },
        },
        chat: {
          connect: { 
            id: chatId 
          },
        },
      },
      include: { 
        user: true, 
        chat: true 
      },
    });
  }

  async getChatById(chatId: string) {
    return this.prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        users: true,
        messages: true,
      },
    });
  }
}
