import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamRepository } from 'src/team/team.repository';
import { CreatePlanDto } from './dto/create-plan.dto';
import { Plan } from './plan.entity';
import { PlanRepository } from './plan.repository';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(PlanRepository)
    private plansRepository: PlanRepository,

    @InjectRepository(TeamRepository)
    private teamsRepository: TeamRepository,
  ) {}

  async getPlansByTeam(team_id: number): Promise<Plan[]> {
    const team = await this.teamsRepository.findOneBy({
      id: team_id,
    });
    if (!team) {
      throw new NotFoundException(`해당 팀을 찾을 수 없습니다.`);
    }
    return this.plansRepository.findBy({ team: { id: team_id } });
  }

  async createPlan(
    createPlanDto: CreatePlanDto,
    team_id: number,
  ): Promise<void> {
    const team = await this.teamsRepository.findOneBy({ id: team_id });
    if (!team) {
      throw new NotFoundException(`해당 팀을 찾을 수 없습니다.`);
    }
    return this.plansRepository.createPlan(createPlanDto, team);
  }
}
