import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePlanDto } from './dto/create-plan.dto';
import { Plan } from './plan.entity';
import { PlansService } from './plan.service';

@Controller('plan')
@ApiTags('플랜 API')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Get('/:team_id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'CreatePlan API',
    description: '팀 플랜 조회',
  })
  @ApiCreatedResponse({
    description: '팀의 플랜을 조회한다.',
    type: null,
  })
  @UseGuards(AuthGuard())
  getPlans(@Param('team_id') team_id: number): Promise<Plan[]> {
    if (!team_id) {
      throw new BadRequestException();
    }
    return this.plansService.getPlansByTeam(team_id);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'CreatePlan API',
    description: '팀 플랜 생성',
  })
  @ApiCreatedResponse({
    description: '팀의 플랜을 생성한다.',
    type: null,
  })
  @UseGuards(AuthGuard())
  createPlan(
    @Body(ValidationPipe) createPlanDto: CreatePlanDto,
    @Body('team_id') team_id: number,
  ): Promise<void> {
    return this.plansService.createPlan(createPlanDto, team_id);
  }
}
