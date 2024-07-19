import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { String } from 'aws-sdk/clients/batch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3: AWS.S3;
  private bucketName: string;
  private secretName: string;

  constructor(private readonly httpService: HttpService, private configService: ConfigService) {
    this.s3 = new AWS.S3({apiVersion: '2006-03-01',
      region: this.configService.get('S3_REGION') ?? '',
      accessKeyId: this.configService.get('S3_KEY') ?? '',
      secretAccessKey: this.configService.get('S3_SECRET') ?? ''});
    this.bucketName = this.configService.get('S3_BUCKET') ?? '';
  }

  async upload( filePath: string) {
    const fileStream = fs.createReadStream(filePath);
      const uploadParams = {
        Bucket: this.bucketName,
        Key: path.basename(filePath),
        Body: fileStream,
      };
  
      const data = await this.s3.upload(uploadParams).promise();
      return 'Upload Success: ' + data.Location;
  }

  async download(fileName: string, downloadPath: string) {
    const downloadParams = {
      Bucket: this.bucketName,
      Key: fileName,
    };

    const fullDownloadPath = path.join(downloadPath, fileName);

    const data = await this.s3.getObject(downloadParams).promise();
    fs.writeFileSync(fullDownloadPath, data.Body as Buffer);
    return 'Download Success';
  }

  async delete(fileName: string) {
    const deleteParams = {
      Bucket: this.bucketName,
      Key: fileName,
    };

    await this.s3.deleteObject(deleteParams).promise();
    return 'Delete Success';
  }

  async renameFile(oldFilename: string, newFilename: string): Promise<String> {
    try {
      await this.s3.copyObject({
        Bucket: this.bucketName,
        CopySource: `/${this.bucketName}/${oldFilename}`,
        Key: newFilename,
      }).promise();

      await this.s3.deleteObject({
        Bucket: this.bucketName,
        Key: oldFilename,
      }).promise();

      return 'Rename Success';
    } catch (error) {
      return error.message;
    }
  }

  async list() {
    const listParams = {
      Bucket: this.bucketName,
    };

    const data = await this.s3.listObjectsV2(listParams).promise();
    return 'Files: ' + data.Contents?.map(file => file.Key).join(', ');
  }

  async uploadFileFromServer(url: string): Promise<string> {
    try{
      const response: AxiosResponse<any> = await lastValueFrom(this.httpService.get(url, {
        responseType: 'stream',
      }));
  
      const params = {
        Bucket: this.bucketName,
        Key: this.getFileNameFromUrl(url),
        Body: response.data,
      };
  
      await this.s3.upload(params).promise();

      return "Upload Success";

    } catch(err){
       return err.message;
    }
  }

  getFileNameFromUrl = (url: String) => {
    let urlObj = new URL(url);
    let pathComponents = urlObj.pathname.split('/');
    let fileName = pathComponents[pathComponents.length - 1];
    return fileName;
  }
}
