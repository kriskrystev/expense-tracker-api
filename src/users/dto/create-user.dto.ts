import { MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(2)
  username: string;

  @MinLength(8)
  password: string;
}
