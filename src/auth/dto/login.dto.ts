import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    description: '이메일',
    default: '***@*****.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  email: string;

  @ApiProperty({
    description: '비밀번호',
    default: '',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(12)
  @Matches(/^[a-zA-Z0-9|!|@|#]/, {
    message: '영어, 숫자, !, @, # 만 입력 가능합니다.',
  })
  password: string;
}

export class LoginResponseDto {
  accessToken: string;
}
