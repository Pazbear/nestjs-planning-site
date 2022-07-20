import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({
    description: '플랜명',
    default: '',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  title: string;

  @ApiProperty({
    description: '플랜 상세내용',
    default: '',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(3000)
  description: string;

  @ApiProperty({
    description: '플랜 시작일',
    default: '20200101',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  start_date: string; //20200101

  @ApiProperty({
    description: '플랜 종료일',
    default: '20200101',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  end_date: string; //20200101
}
