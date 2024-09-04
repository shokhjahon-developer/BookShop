import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { CreateCartDto } from './dto/create-cart.dto';
import { ICurrentUser } from '@type';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateCartDto, currentUser: ICurrentUser) {
    const newCart = await this.prisma.cart.create({
      data: {
        bookId: payload.bookId,
        userId: currentUser.id, // Use the current user's ID
      },
    });

    return newCart;
  }

  async findAll(
    currentUser: ICurrentUser,
    page: number = 1,
    pageSize: number = 10,
  ) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const carts = await this.prisma.cart.findMany({
      where: { userId: currentUser.id }, // Filter by current user's ID
      skip,
      take,
    });

    const totalCount = await this.prisma.cart.count({
      where: { userId: currentUser.id },
    });

    return {
      data: carts,
      total: totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  }

  async findOne(id: string, currentUser: ICurrentUser) {
    const cart = await this.prisma.cart.findFirst({
      where: { id, userId: currentUser.id }, // Filter by current user's ID
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

  async remove(id: string, currentUser: ICurrentUser) {
    await this.findOne(id, currentUser); // Ensure it exists for the current user
    const deletedCart = await this.prisma.cart.delete({
      where: { id },
    });

    return deletedCart;
  }
}
