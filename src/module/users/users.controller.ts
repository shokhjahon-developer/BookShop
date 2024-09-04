import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard, RoleGuard } from '@guards';
import { ICurrentUser } from '@type';
import { CreateUserDto, UpdateUserDto } from './dto';
import { CurrentUser } from '@decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create({ ...payload, isAdmin: true });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile/me')
  profile(@CurrentUser() user: ICurrentUser) {
    return this.usersService.profile(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
