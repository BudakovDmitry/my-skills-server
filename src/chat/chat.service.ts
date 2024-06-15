import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { ChatDto } from './dto/chat.dto.js';
import { MessageDto } from './dto/message.dto.js';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}
  
  async createChat(dto: ChatDto) {
    const existingChat = await this.prisma.chat.findFirst({
      where: {
        users: {
          every: {
            userId: { in: dto.users },
          },
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });
  

    if (existingChat) {
      return existingChat;
    }

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
        user: {
          select: {
            firstName: true,
            lastName: true,
            photo: true,
          },
        },
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
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                photo: true,
              },
            },
          },
        },
      },
    });
  }

  async getAllChatsByUserId(userId: string) {
    const userChats = await this.prisma.userChat.findMany({
      where: {
        userId,
      },
      include: {
        chat: {
          include: {
            messages: true,
            users: {
              include: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    photo: true,
                  },
                }
              },
            },
          },
        },
      },
    });
  
    const filteredChats = userChats.map(chatRelation => {
      const chat = chatRelation.chat;
      chat.users = chat.users.filter(
        userRelation => userRelation.userId !== userId
      ).slice(0, 1);
      return chat;
    });
  
    return filteredChats;
  }

  async markMessagesAsRead(userId: string, chatId: string) {
    const messages = await this.prisma.message.updateMany({
      where: {
        chatId,
        userId: {
          not: userId,
        },
        read: false,
      },
      data: {
        read: true,
      },
    });

    return messages;
  }
}
