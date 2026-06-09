import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGuard } from './guard/chat.guard';
import { ChatDtoUsers } from './dto/chat.dto';
import type { RequestNew } from './request.interface';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  //chat Post
  @UseGuards(ChatGuard)
  @Post()
  async sendMessageController(
    @Body() bodyDto: ChatDtoUsers,
    @Req() req: RequestNew,
  ) {
    const message = await this.chatService.sendMessageService(
      bodyDto,
      req.users.id,
    );
    return {
      message: 'Successfully Send Message',
      data: message,
      from: req.users.username,
    };
  }

  //get all message
  @UseGuards(ChatGuard)
  @Get()
  async getAllMessageController() {
    const message = await this.chatService.getAllMessageService();
    return {
      message: 'Successfully Get All Message',
      data: message,
    };
  }
}
