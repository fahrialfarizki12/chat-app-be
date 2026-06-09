import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
  exports: [],
})
export class ChatModule {}
