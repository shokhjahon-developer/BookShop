import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class VerifyDto {
  @ApiProperty({ example: 'john@gmail.com' })
  @IsEmail()
  @MaxLength(64)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'johnpassword55' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  code: string;
}
