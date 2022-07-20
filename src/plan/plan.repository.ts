import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomRepository } from 'src/configs/db/typeorm-ex.decorator';
import { Team } from 'src/team/team.entity';
import { Repository } from 'typeorm';
import { CreatePlanDto } from './dto/create-plan.dto';
import { Plan } from './plan.entity';

@CustomRepository(Plan)
export class PlanRepository extends Repository<Plan> {
  async createPlan(createPlanDto: CreatePlanDto, team: Team): Promise<void> {
    const { title, description, start_date, end_date } = createPlanDto;
    const plan = this.create({
      title,
      description,
      start_date,
      end_date,
      team,
    });
    try {
      await this.save(plan);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('플랜이 이미 존재합니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
