import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async createUser(createUserDto: CreateUserDto) {
    const usernameExists = await this.userRepo.exist({
      where: { username: createUserDto.username },
    });

    if (usernameExists) {
      throw new ConflictException('Username already exists');
    }

    const pswd = createUserDto.password;
    const salt = 10;
    const hash = await bcrypt.hash(pswd, salt);
    createUserDto.password = hash;
    const newUser = await this.userRepo.save(createUserDto);

    return {
      id: newUser.id,
    };
  }
}
