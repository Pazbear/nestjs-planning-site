import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/configs/db/typeorm-ex.module';
import { TeamsController } from './team.controller';
import { Team, TEAM_USER } from './team.entity';
import { TeamRepository } from './team.repository';
import { TeamsService } from './team.service';
import { TeamUserRepository } from './team_user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, TEAM_USER]),
    TypeOrmExModule.forCustomRepository([TeamRepository, TeamUserRepository]),
    AuthModule,
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamModule {}
