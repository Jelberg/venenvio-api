import { Controller, Get, Query, Post , HttpCode, UseGuards} from '@nestjs/common';
import { S3Service } from './s3.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

    @UseGuards(AuthGuard('bearer'))
    @Get('upload')
    async upload(@Query('filePath') filePath: string) {
      return this.s3Service.upload(filePath);
    }
  
    @UseGuards(AuthGuard('bearer'))
    @Post('upload-from-server')
    async uploadFileFromServer(@Query('url') url: string) {
      return this.s3Service.uploadFileFromServer(url);
    }

    @UseGuards(AuthGuard('bearer'))
    @Get('download')
    async download(@Query('fileName') fileName: string, @Query('downloadPath') downloadPath: string) {
      return this.s3Service.download(fileName, downloadPath);
    }
  
    @UseGuards(AuthGuard('bearer'))
    @Get('list')
    async list() {
      return this.s3Service.list();
    }
  
    @UseGuards(AuthGuard('bearer'))
    @Get('delete')
    async delete(@Query('fileName') fileName: string) {
      return this.s3Service.delete(fileName);
    }

    @UseGuards(AuthGuard('bearer'))
    @Post('rename')
    @HttpCode(200)
    async rename(@Query('oldname') oldFilename: string, @Query('newname') newFilename: string) {
      return this.s3Service.renameFile(oldFilename, newFilename);
    }   
}