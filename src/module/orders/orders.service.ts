import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '@prisma';
import { CreateOrderDto } from './dto/create-order.dto';
import { ICurrentUser } from '@type';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateOrderDto, currentUser: ICurrentUser) {
    const newOrder = await this.prisma.order.create({
      data: {
        bookId: payload.bookId,
        userId: currentUser.id, // Use the current user's ID
        quantity: payload.quantity,
        status: 'pending', // Default status is pending
      },
    });

    return newOrder;
  }

  async findAll(
    currentUser: ICurrentUser,
    page: number = 1,
    pageSize: number = 10,
  ) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const orders = await this.prisma.order.findMany({
      where: { userId: currentUser.id }, // Filter by current user's ID
      skip,
      take,
      include: {
        Book: true,
      },
    });

    const totalCount = await this.prisma.order.count({
      where: { userId: currentUser.id },
    });

    return {
      data: orders,
      total: totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  }

  async findOne(id: string, currentUser: ICurrentUser) {
    const order = await this.prisma.order.findFirst({
      where: { id, userId: currentUser.id }, // Filter by current user's ID
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async cancel(id: string, currentUser: ICurrentUser) {
    const order = await this.findOne(id, currentUser); // Ensure it exists for the current user
    if (order.status === 'shipped') {
      throw new ForbiddenException('Shipped orders cannot be cancelled');
    }

    const cancelledOrder = await this.prisma.order.update({
      where: { id },
      data: { status: 'cancelled' },
    });

    return cancelledOrder;
  }
}
