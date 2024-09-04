import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFavouriteDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ example: '4cbeea77-f2b2-4a0e-9d94-1f038d2d7c28' })
  bookId: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ example: '1e4e8a45-0a8b-4e6c-9c3b-5d4e6b79d2c8' })
  userId: string;
}
