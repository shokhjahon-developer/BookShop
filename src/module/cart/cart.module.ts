import { Module } from '@nestjs/common';
import { CartsController } from './cart.controller';
import { CartsService } from './cart.service';
import { PrismaModule } from '@prisma';

@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports: [PrismaModule],
})
export class CartModule {}
