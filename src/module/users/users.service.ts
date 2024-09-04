import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ICurrentUser } from '@type';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateUserDto) {
    const { firstname, lastname, email, password, isAdmin } = payload;

    const hashedPass = await bcrypt.hash(password, 12);

    const user = await this.prisma.user.create({
      data: { firstname, lastname, email, password: hashedPass, isAdmin },
    });

    return { message: 'Success', data: user };
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { message: 'Success', data: user };
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

  async update(id: string, payload: UpdateUserDto) {
    const { firstname, lastname, email, password, isAdmin } = payload;
    const hashedPass = await bcrypt.hash(password, 12);

    const user = await this.prisma.user.update({
      where: { id },
      data: { firstname, lastname, email, password: hashedPass, isAdmin },
    });

    return { message: 'Success', data: user };
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
