import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaModule } from '@prisma';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [PrismaModule],
  exports: [CategoriesService],
})
export class CategoriesModule {}
