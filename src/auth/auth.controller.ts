import {
  Body,
  Controller,
  Get,
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
import { AuthService } from './auth.service';
import { getMeDto } from './dto/get-me.dto';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { GetMe } from './get-me.decorator';
import { User } from './user.entity';

@Controller('auth')
@ApiTags('인증 API')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/me')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'GetMe API',
    description: '자신의 유저 정보 조회',
  })
  @ApiCreatedResponse({ description: '자신의 유저 정보를 얻는다.', type: User })
  @UseGuards(AuthGuard())
  me(@GetMe() user: User): getMeDto {
    const { id, email, nickname } = user;
    return {
      id,
      email,
      nickname,
    };
  }

  @Post('register')
  @ApiOperation({
    summary: 'Register API',
    description: '회원가입',
  })
  @ApiCreatedResponse({ description: '유저를 생성한다.', type: null })
  @ApiBody({ type: RegisterDto })
  register(@Body(ValidationPipe) registerDto: RegisterDto): Promise<void> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login API',
    description: '로그인',
  })
  @ApiCreatedResponse({
    description: '액세스 토큰 획득',
    type: LoginResponseDto,
  })
  login(
    @Body(ValidationPipe) loginDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }
}
