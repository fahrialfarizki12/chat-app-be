import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';
import { RegisterDtoUsers } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaClientService,
    private JwtService: JwtService,
  ) {}

  /**
   * REGISTER USERS
   * @param bodyDto
   * @returns
   */
  async Register(bodyDto: RegisterDtoUsers) {
    //cek apakah no telepon sudah terdaftar atau belum
    const findTelepon = await this.prismaService.users.findUnique({
      where: {
        telepon: bodyDto.telepon,
      },
    });
    //jika ada tidak bisa mendaftar lagi
    if (findTelepon) {
      throw new BadRequestException(
        'Maaf, No Telepon ini sudah terdaftar sebelumnya',
      );
    }
    //jika tidak ada, maka bisa mendaftar
    const dataUsers = await this.prismaService.users.create({
      data: {
        username: bodyDto.username,
        telepon: bodyDto.telepon,
      },
    });
    return dataUsers;
  }

  //login service
  async LoginService(bodyDto: RegisterDtoUsers) {
    //cek apakah no telepon sudah terdaftar atau belum
    const findTelepon = await this.prismaService.users.findUnique({
      where: {
        telepon: bodyDto.telepon,
      },
    });
    //jika tidak ada maka suruh register terlebih dahulu
    if (!findTelepon) {
      throw new BadRequestException(
        'Maaf, No Telepon ini belum terdaftar, silakan daftar terlebih dahulu',
      );
    }
    const token = this.JwtService.sign({
      id: findTelepon.id,
      username: findTelepon.username,
      telepon: findTelepon.telepon,
    });

    return {
      token,
      data: findTelepon,
    };
  }
}
