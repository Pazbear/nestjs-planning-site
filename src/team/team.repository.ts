import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CustomRepository } from 'src/configs/db/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './team.entity';

@CustomRepository(Team)
export class TeamRepository extends Repository<Team> {
  async createTeam(user: User, createTeamDto: CreateTeamDto): Promise<void> {
    const { name } = createTeamDto;
    const team = this.create({ name, owner: user });
    try {
      await this.save(team);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('팀이 이미 존재합니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
