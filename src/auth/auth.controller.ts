import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { getMeDto } from './dto/get-me.dto';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { GetMe } from './get-me.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/me')
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
  register(@Body(ValidationPipe) registerDto: RegisterDto): Promise<void> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body(ValidationPipe) loginDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }
}
