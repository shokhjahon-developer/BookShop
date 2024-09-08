import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { AuthGuard, RoleGuard } from '@guards';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileService } from '../files/files.service';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly fileService: FileService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo', maxCount: 1 },
      { name: 'file', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        isbn: { type: 'string' },
        author: { type: 'string' },
        categoryId: { type: 'string' },
        photo: {
          type: 'string',
          format: 'binary',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFiles()
    files: { photo?: Express.Multer.File[]; file?: Express.Multer.File[] },
  ) {
    if (files.photo) {
      const photoUrl = await this.fileService.create({
        body: files.photo[0].buffer,
        fileName: files.photo[0].originalname,
        fileType: files.photo[0].mimetype,
      });
      createBookDto.photo = photoUrl.data as unknown as Express.Multer.File;
    }
    if (files.file) {
      const fileUrl = await this.fileService.create({
        body: files.file[0].buffer,
        fileName: files.file[0].originalname,
        fileType: files.file[0].mimetype,
      });
      createBookDto.file = fileUrl.data as unknown as Express.Multer.File;
    }
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo', maxCount: 1 },
      { name: 'file', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        isbn: { type: 'string' },
        author: { type: 'string' },
        categoryId: { type: 'string' },
        photo: {
          type: 'string',
          format: 'binary',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @UploadedFiles()
    files: { photo?: Express.Multer.File[]; file?: Express.Multer.File[] },
  ) {
    if (files.photo) {
      const photoUrl = await this.fileService.create({
        body: files.photo[0].buffer,
        fileName: files.photo[0].originalname,
        fileType: files.photo[0].mimetype,
      });
      updateBookDto.photo = photoUrl.data as unknown as Express.Multer.File;
    }
    if (files.file) {
      const fileUrl = await this.fileService.create({
        body: files.file[0].buffer,
        fileName: files.file[0].originalname,
        fileType: files.file[0].mimetype,
      });
      updateBookDto.file = fileUrl.data as unknown as Express.Multer.File;
    }
    return this.booksService.update(id, updateBookDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
