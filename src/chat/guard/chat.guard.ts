import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Observable } from 'rxjs';
import { RequestNew } from '../request.interface';

@Injectable()
export class ChatGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestNew = context.switchToHttp().getRequest();

    //ambil token
    const token = request.cookies?.token;
    //cek apakah token ada
    if (!token) {
      throw new UnauthorizedException('Silakan login terlebih dahulu');
    }
    try {
      const payload = await this.jwtService.verify(token);
      //kita simpan ke request
      request.users = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token tidak valid');
    }
  }
}
