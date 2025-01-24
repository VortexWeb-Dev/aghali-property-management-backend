import { Controller, Post, Body } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly s3Service: FilesService) {}

  @Post('presigned-url')
  async createPresignedUrl(@Body() body: { key: string; contentType: string }) {
    const { key, contentType } = body;

    if (!key || !contentType) {
      throw new Error('Both "key" and "contentType" are required.');
    }

    const presignedUrl = await this.s3Service.generatePresignedUrl({
      key,
      contentType,
    });

    return { presignedUrl };
  }
}
