import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  firstname: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  lastname: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsEmail()
  @MaxLength(64)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'johnpassword55' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  password: string;

  isAdmin: boolean;
}
