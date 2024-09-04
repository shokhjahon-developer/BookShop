import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { PrismaModule } from '@prisma';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService],
  imports: [PrismaModule],
})
export class FavouritesModule {}
