import { Injectable, Body } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class FilesService {
  private readonly s3Client: S3Client;
  private readonly bucketName = process.env.AWS_BUCKET_NAME;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
      },
    });
  }

  async generatePresignedUrl(
    @Body() body: { key: string; contentType: string },
  ): Promise<{ presignedUrl: string }> {
    const { key, contentType } = body;

    if (!key || !contentType) {
      throw new Error('Both "key" and "contentType" are required.');
    }

    const params: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType,
    };

    const command = new PutObjectCommand(params);

    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });

    return { presignedUrl: url };
  }
}
