import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FavouritesService } from './favourites.service';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { AuthGuard } from '@guards';
import { CurrentUser } from '@decorator';
import { ICurrentUser } from '@type';

@ApiTags('Favourites')
@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createFavouriteDto: CreateFavouriteDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.favouritesService.create(createFavouriteDto, user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  findAll(@CurrentUser() user: ICurrentUser) {
    return this.favouritesService.findAll(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.favouritesService.findOne(id, user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.favouritesService.remove(id, user);
  }
}
