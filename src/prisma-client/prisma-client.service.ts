import { Injectable } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaClientService extends PrismaClient {
  constructor() {
    const adapter = new PrismaMariaDb({
      host: 'o1893_chat',
      password: '[9de154MP+wSyK',
      user: 'db.shared.octavia.id',
      database: 'o1893_chat',
      port: 3306,
      connectionLimit: 5,
    });
    super({ adapter });
  }
}
