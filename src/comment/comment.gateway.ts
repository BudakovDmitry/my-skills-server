import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CommentService } from './comment.service.js';
import { CommentDto } from './dto/comment.dto.js';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
})
export class CommentGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly commentService: CommentService) {}

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  @SubscribeMessage('createComment')
  async handleCreateComment(@MessageBody() dto: CommentDto) {
    try {
      const comment = await this.commentService.create(dto);
      this.server.emit('commentCreated', comment);
      return { success: true, comment };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
