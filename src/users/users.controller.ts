import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { RegisterDtoUsers } from './dto/users.dto';
import type { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //REGISTER CONTROLLER
  @Post('/register')
  async RegisterController(@Body() bodyDto: RegisterDtoUsers) {
    const users = await this.usersService.Register(bodyDto);
    return {
      message: 'Successfully Registered',
      data: users,
    };
  }

  //LOGIN CONTROLLER'
  @Post('/login')
  async LoginController(
    @Body() bodyDto: RegisterDtoUsers,
    @Res({ passthrough: true }) res: Response,
  ) {
    const users = await this.usersService.LoginService(bodyDto);

    //kirim cookie
    res.cookie('token', users.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // 🔥 penting
      // sameSite: 'none', // 🔥 lebih aman untuk localhost
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/', // 🔥 wajib biar bisa dibaca proxy
    });

    return {
      message: 'Successfully Logged In',
      data: users,
    };
  }
}
