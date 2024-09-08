import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { ICurrentUser } from '@type';

@Injectable()
export class FavouritesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateFavouriteDto, currentUser: ICurrentUser) {
    const newFavourite = await this.prisma.favourite.create({
      data: {
        bookId: payload.bookId,
        userId: currentUser.id,
      },
    });

    return newFavourite;
  }

  async findAll(
    currentUser: ICurrentUser,
    page: number = 1,
    pageSize: number = 10,
  ) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const favourites = await this.prisma.favourite.findMany({
      where: { userId: currentUser.id }, // Filter by current user's ID
      skip,
      take,
      include: {
        Book: true,
      },
    });

    const totalCount = await this.prisma.favourite.count({
      where: { userId: currentUser.id },
    });

    return {
      data: favourites,
      total: totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  }

  async findOne(id: string, currentUser: ICurrentUser) {
    const favourite = await this.prisma.favourite.findFirst({
      where: { id, userId: currentUser.id },
      include: {
        Book: true,
      },
    });
    if (!favourite) {
      throw new NotFoundException('Favourite not found');
    }

    return favourite;
  }

  async remove(id: string, currentUser: ICurrentUser) {
    await this.findOne(id, currentUser);
    const deletedFavourite = await this.prisma.favourite.delete({
      where: { id },
    });

    return deletedFavourite;
  }
}
