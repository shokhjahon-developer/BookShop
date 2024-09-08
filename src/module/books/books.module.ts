import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaModule } from '@prisma';
import { FileModule } from 'module/files/files.module';
import { AuthModule } from 'module/auth/auth.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [PrismaModule, FileModule, AuthModule],
})
export class BooksModule {}
