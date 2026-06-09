import { Type } from 'class-transformer';
import { IsString, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterDtoUsers {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  telepon: string;
}
