import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service.js';
import { MessageDto } from './dto/message.dto.js';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createMessage')
  async handleMessage(@MessageBody() createMessageDto: MessageDto) {
    try {
      const message = await this.chatService.createMessage(createMessageDto);
      this.server.emit('messageCreated', message);

      return { success: true, message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('markChatAsRead')
  async handleMarkChatAsRead(@MessageBody() { userId, chatId }: { userId: string; chatId: string }) {
    try {
      await this.chatService.markMessagesAsRead(userId, chatId);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
