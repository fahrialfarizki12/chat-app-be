import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import 'dotenv/config';
import { PrismaClientModule } from './prisma-client/prisma-client.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ChatModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    UsersModule,
    PrismaClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
