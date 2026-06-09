import { Injectable } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class PrismaClientService extends PrismaClient {
  constructor() {
    const adapter = new PrismaMariaDb({
      host: 'db.shared.octavia.id',
      user: 'o1893_chat',
      password: '[9de154MP+wSyK',
      database: 'o1893_chat',
      port: 3306,
      connectionLimit: 5,
    });

    super({ adapter });
  }
}
