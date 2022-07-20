import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/configs/db/typeorm-ex.module';
import { Team } from 'src/team/team.entity';
import { TeamRepository } from 'src/team/team.repository';
import { PlansController } from './plan.controller';
import { Plan } from './plan.entity';
import { PlanRepository } from './plan.repository';
import { PlansService } from './plan.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, Plan]),
    TypeOrmExModule.forCustomRepository([TeamRepository, PlanRepository]),
    AuthModule,
  ],
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlanModule {}
