import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  @ApiProperty({ example: '4cbeea77-f2b2-4a0e-9d94-1f038d2d7c28' })
  bookId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  quantity: number;
}
