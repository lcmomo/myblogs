
import { CommonService } from '../service/common';
import { UserDto } from '../models/dto/user';
import { AuthToken } from '../interceptors';
import { API_PATH, staticFileDir } from '@/config';
import { Body, Controller, Get, Param, Post, Res, ResponseDecoratorOptions, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller(`${API_PATH}/common`)
export class CommonController {
  constructor(private commonService:  CommonService) {}

  @Post('upload')
  @UseInterceptors(AuthToken, FileInterceptor('file', {
    storage: diskStorage({
      destination: staticFileDir,
      filename: (req, file, cb) => {
        // 自定义文件名
         const randomName = uuidv4();
         const { originalname } = file;
        return cb(null, `${originalname.substring(0, originalname.lastIndexOf('.'))}_${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async upload(@UploadedFile() file: Express.Multer.File) {
    console.log("ifle: ", file)
    return await this.commonService.upload(file);
  }

  @Get('download/:uuid')
  async download(@Param('uuid') uuid: string, @Res() res: ResponseDecoratorOptions) {
 
      return await this.commonService.download(uuid, res);
  }
}
