import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  @ApiProperty({ example: '4cbeea77-f2b2-4a0e-9d94-1f038d2d7c28' })
  bookId: string;
}
