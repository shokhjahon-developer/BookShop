import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Some Title' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'This is a description of the book.' })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '978-3-16-148410-0' })
  isbn: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'path/to/photo.jpg' })
  photo: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'path/to/file.pdf' })
  file: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Doe' })
  author: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ example: '4cbeea77-f2b2-4a0e-9d94-1f038d2d7c28' })
  categoryId: string;
}
