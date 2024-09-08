import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  isbn: string;

  @IsString()
  author: string;

  @IsUUID()
  categoryId: string;

  @IsOptional()
  photo?: Express.Multer.File;

  @IsOptional()
  file?: Express.Multer.File;
}
