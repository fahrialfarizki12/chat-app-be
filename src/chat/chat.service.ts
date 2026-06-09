import { Injectable } from '@nestjs/common';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';
import { ChatDtoUsers } from './dto/chat.dto';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatService {
  constructor(
    private readonly prismaService: PrismaClientService,
    private readonly chatGateway: ChatGateway,
  ) {}

  //send message by users login & NO TELEPON USERS YG LOGIN
  async sendMessageService(bodyDto: ChatDtoUsers, usersId: string) {
    const dataMessage = await this.prismaService.message.create({
      data: {
        content: bodyDto.content,
        senderId: usersId,
      },
      include: {
        sender: true,
      },
    });

    //simpan data ke socket
    this.chatGateway.EmitSendMessagee(dataMessage);
    return dataMessage;
  }

  //get all message
  async getAllMessageService() {
    const dataMessage = await this.prismaService.message.findMany({
      include: {
        sender: true,
      },
    });
    return dataMessage;
  }
}
