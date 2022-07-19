import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetMe } from 'src/auth/get-me.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './team.entity';
import { TeamsService } from './team.service';

@Controller('team')
export class TeamsController {
  private logger = new Logger('TeamsController');

  constructor(private teamsService: TeamsService) {}

  @Get('/:search_word')
  getAllTeams(@Param('search_word') search_word: string): Promise<Team[]> {
    return this.teamsService.getAllTeams(search_word);
  }

  @Get('/my')
  @UseGuards(AuthGuard())
  getMyTeams(@GetMe() user: User): Promise<Team[]> {
    this.logger.verbose(`유저 ${user.nickname}가 자신의 팀을 조회했습니다.`);
    return this.teamsService.getMyTeams(user);
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createTeam(
    @GetMe() user: User,
    @Body() createTeamDto: CreateTeamDto,
  ): Promise<void> {
    this.logger.verbose(`유저 ${user.nickname}가 새 팀을 생성중입니다.
      페이로드: ${JSON.stringify(createTeamDto)}`);
    return this.teamsService.createTeam(user, createTeamDto);
  }

  @Post('/join')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  joinTeam(
    @GetMe() user: User,
    @Body('team_id') team_id: number,
  ): Promise<void> {
    return this.teamsService.joinTeam(user, team_id);
  }
}
