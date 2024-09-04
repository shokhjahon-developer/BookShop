import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CartsService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { AuthGuard } from '@guards';
import { CurrentUser } from '@decorator';
import { ICurrentUser } from '@type';

@ApiTags('Carts')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  create(
    @Body() createCartDto: CreateCartDto,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.cartsService.create(createCartDto, currentUser);
  }

  @Get()
  findAll(
    @CurrentUser() currentUser: ICurrentUser,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.cartsService.findAll(currentUser, page, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() currentUser: ICurrentUser) {
    return this.cartsService.findOne(id, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() currentUser: ICurrentUser) {
    return this.cartsService.remove(id, currentUser);
  }
}
