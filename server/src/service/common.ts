
import { Inject, Injectable, Res, ResponseDecoratorOptions } from '@nestjs/common';

import {  ResultGenerator } from '../core/result_generator';
import { File as MyFile } from '@/database/models';
import path, { join } from 'path';

@Injectable()
export class CommonService {
  constructor(@Inject('MyFile') private readonly fileModel: typeof MyFile){}

  async upload(file: Express.Multer.File) {
    const fileName = file.filename.substring(0, file.filename.lastIndexOf('.')); // 从文件名中提取 UUID
    const uuid = fileName.substring(fileName.lastIndexOf('_')  + 1);
    await this.fileModel.create({uuid, filename: `${file.destination}/${file.filename}`});
    return ResultGenerator.genSuccessResult({ uuid })
  }
  async download(uuid: string, res: any) {
    const data = await this.fileModel.findOne({
      where: {
        uuid: uuid
      }
    });

    if (data && data.filename) {

      res.sendFile(data.filename);
    } else {
      return ResultGenerator.genFailResult(200, '文件不存在');
    }

  }
}