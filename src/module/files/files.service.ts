import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import * as path from 'path';

@Injectable()
export class FileService {
  private client: S3Client;

  constructor(private configService: ConfigService) {
    const endpoint = this.configService.get('r2.endpoint');

    this.client = new S3Client({
      region: 'auto',
      endpoint,
      credentials: {
        accessKeyId: this.configService.get('r2.access'),
        secretAccessKey: this.configService.get('r2.secret'),
      },
    });
  }

  async create({ body, fileName, fileType }) {
    if (!/^(image\/(png|jpg|jpeg|svg|heic|gif|webp|pdf))$/.test(fileType))
      throw new BadRequestException('Invalid File Type');

    const { url } = await this.upload({ body, fileName, fileType });

    return { message: 'Success', data: url };
  }

  private async upload({ body, fileName, fileType }): Promise<{ url: string }> {
    const uniqueFileName = `${randomUUID()}${path.extname(fileName)}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.configService.get('r2.bucket'),
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body,
      }),
    );

    return { url: uniqueFileName };
  }
}
