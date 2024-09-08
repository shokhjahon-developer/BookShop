import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ICurrentUser } from '@type';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async profile(payload: ICurrentUser) {
    const data = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });

    delete data['password'];
    delete data['isActive'];
    delete data['isAdmin'];

    return { message: 'Success', data };
  }

  async remove(id: string) {
    const data = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return data;
  }

  async findOneByemail(email: string, isAdmin?: boolean) {
    const user = await this.prisma.user.findFirst({
      where: { email, isAdmin },
    });

    return user;
  }
}
