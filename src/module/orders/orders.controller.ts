import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '@guards';
import { CurrentUser } from '@decorator';
import { ICurrentUser } from '@type';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.ordersService.create(createOrderDto, currentUser);
  }

  @Get()
  findAll(
    @CurrentUser() currentUser: ICurrentUser,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.ordersService.findAll(currentUser, page, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() currentUser: ICurrentUser) {
    return this.ordersService.findOne(id, currentUser);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @CurrentUser() currentUser: ICurrentUser) {
    return this.ordersService.cancel(id, currentUser);
  }
}
