import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '@prisma';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(payload: CreateCategoryDto) {
    const newCategory = await this.prisma.category.create({
      data: {
        name: payload.name,
      },
    });

    return newCategory;
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const categories = await this.prisma.category.findMany({
      skip: skip,
      take: take,
      include: {
        books: true,
      },
    });

    const totalCount = await this.prisma.category.count();

    return {
      data: categories,
      total: totalCount,
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findFirst({
      where: { id },
      include: { books: true },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, payload: UpdateCategoryDto) {
    await this.findOne(id);
    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: { name: payload.name },
    });

    return updatedCategory;
  }

  async remove(id: string) {
    await this.findOne(id);
    const data = await this.prisma.category.delete({
      where: {
        id,
      },
    });

    return data;
  }
}
