import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '@prisma';
import { FileService } from '../files/files.service';

@Injectable()
export class BooksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async create(payload: CreateBookDto) {
    const categoryExists = await this.prisma.category.findUnique({
      where: { id: payload.categoryId },
    });

    if (!categoryExists) {
      throw new BadRequestException(
        'Invalid categoryId: Category does not exist',
      );
    }

    let photoUrl: string | undefined;
    let fileUrl: string | undefined;

    if (payload.photo) {
      const photoResult = await this.fileService.create({
        body: payload.photo.buffer,
        fileName: payload.photo.originalname,
        fileType: payload.photo.mimetype,
      });
      photoUrl = photoResult.data;
    }

    if (payload.file) {
      const fileResult = await this.fileService.create({
        body: payload.file.buffer,
        fileName: payload.file.originalname,
        fileType: payload.file.mimetype,
      });
      fileUrl = fileResult.data;
    }

    const newBook = await this.prisma.book.create({
      data: {
        title: payload.title,
        description: payload.description,
        isbn: payload.isbn,
        photo: photoUrl,
        file: fileUrl,
        author: payload.author,
        categoryId: payload.categoryId,
      },
    });

    return newBook;
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const books = await this.prisma.book.findMany({
      skip: skip,
      take: take,
    });

    const totalCount = await this.prisma.book.count();

    return {
      data: books,
      total: totalCount,
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async update(id: string, payload: UpdateBookDto) {
    await this.findOne(id);

    let photoUrl: string | undefined;
    let fileUrl: string | undefined;

    if (payload.photo) {
      const photoResult = await this.fileService.create({
        body: payload.photo.buffer,
        fileName: payload.photo.originalname,
        fileType: payload.photo.mimetype,
      });
      photoUrl = photoResult.data;
    }

    if (payload.file) {
      const fileResult = await this.fileService.create({
        body: payload.file.buffer,
        fileName: payload.file.originalname,
        fileType: payload.file.mimetype,
      });
      fileUrl = fileResult.data;
    }

    const updatedBook = await this.prisma.book.update({
      where: { id },
      data: {
        title: payload.title,
        description: payload.description,
        isbn: payload.isbn,
        photo: photoUrl,
        file: fileUrl,
        author: payload.author,
        categoryId: payload.categoryId,
      },
    });

    return updatedBook;
  }

  async remove(id: string) {
    await this.findOne(id); // Check if the book exists
    const deletedBook = await this.prisma.book.delete({
      where: { id },
    });

    return deletedBook;
  }
}
