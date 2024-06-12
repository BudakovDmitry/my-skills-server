import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common';
import { ChatService } from './chat.service.js';
import { ChatDto } from './dto/chat.dto.js';
import { MessageDto } from './dto/message.dto.js';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @HttpCode(200)
  @Post()
  createChat(@Body() dto: ChatDto) {
    return this.chatService.createChat(dto);
  }

  @HttpCode(200)
  @Post('message')
  createMessage(@Body() dto: MessageDto) {
    return this.chatService.createMessage(dto);
  }

  @HttpCode(200)
  @Get(':id')
  async getChatById(@Param('id') chatId: string) {
    return this.chatService.getChatById(chatId);
  }

  @HttpCode(200)
  @Get('all/:id')
  async getAllChatsByUserId(@Param('id') userId: string) {
    return this.chatService.getAllChatsByUserId(userId)
  }
}
