import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  nickname: string;

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
