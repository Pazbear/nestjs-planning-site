import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomRepository } from 'src/configs/db/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(registerDto: RegisterDto): Promise<void> {
    const { nickname, email, password } = registerDto;
    const user = this.create({ nickname, email, password });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('유저가 이미 존재합니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
