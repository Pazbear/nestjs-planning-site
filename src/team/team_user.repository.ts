import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CustomRepository } from 'src/configs/db/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Team, TEAM_USER } from './team.entity';

@CustomRepository(TEAM_USER)
export class TeamUserRepository extends Repository<TEAM_USER> {
  async createTeamUser(user: User, team: Team): Promise<void> {
    const teamUser = this.create({ user, team });
    try {
      await this.save(teamUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('팀유저가 이미 존재합니다.');
      } else {
        console.error(error);
        throw new InternalServerErrorException('');
      }
    }
  }
}
