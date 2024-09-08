import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { FileService } from './files.service';
import { appConfig } from '@config';

@ApiBearerAuth()
@ApiTags('File')
@Controller({ version: '1', path: 'file' })
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ summary: 'Upload file for all Servicess' })
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async handler(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * appConfig.filesize,
          }),
          new FileTypeValidator({
            fileType: '.(png|jpg|jpeg|svg|heic|gif|webp|pdf)',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.fileService.create({
      fileName: file.originalname,
      fileType: file.mimetype,
      body: file.buffer,
    });
  }
}
