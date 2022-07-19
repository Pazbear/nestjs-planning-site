import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Like } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './team.entity';
import { TeamRepository } from './team.repository';
import { TeamUserRepository } from './team_user.repository';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamRepository)
    private teamsRepository: TeamRepository,

    @InjectRepository(TeamUserRepository)
    private teamUserRepository: TeamUserRepository,
  ) {}

  getAllTeams(search_word: string): Promise<Team[]> {
    return this.teamsRepository.find({
      where: { name: Like(`%${search_word}%`) },
    });
  }

  getMyTeams(user: User): Promise<Team[]> {
    return this.teamsRepository.findBy({ owner: { id: user.id } });
  }

  createTeam(user: User, createTeamDto: CreateTeamDto): Promise<void> {
    return this.teamsRepository.createTeam(user, createTeamDto);
  }

  async joinTeam(user: User, team_id: number): Promise<void> {
    const team = await this.teamsRepository.findOneBy({ id: team_id });
    if (!team) {
      throw new NotFoundException(`해당 팀을 찾을 수 없습니다.`);
    }
    return this.teamUserRepository.createTeamUser(user, team);
  }
}
