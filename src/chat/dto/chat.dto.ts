import { Type } from 'class-transformer';
import { IsString, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class ChatDtoUsers {
  @IsString()
  @IsNotEmpty()
  content: string;
}
