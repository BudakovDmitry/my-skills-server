import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service.js';
import { MessageDto } from './dto/message.dto.js';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() createMessageDto: MessageDto): Promise<void> {
    const message = await this.chatService.createMessage(createMessageDto);
    this.server.emit('message', message);
  }
}
