import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  email: string;

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
