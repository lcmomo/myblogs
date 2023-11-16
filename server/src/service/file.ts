

import { Inject, Injectable } from '@nestjs/common';

import {  ResultGenerator } from '../core/result_generator';

import { File } from '@/database/models';

@Injectable()
export class FileService {
  constructor(@Inject('File') private readonly fileModel: typeof File){}

  async create({ uuid, filename }: File) {
    try {
    // 添加评论
    if (!uuid) {
      const file = await this.fileModel.create({ uuid, filename });
    } 
    return ResultGenerator.genDefaultSuccessResult();
  } catch (e) {
    return ResultGenerator.genFailResult(500, '服务端错误');
  }
  }


  async delete(uuid: string) {
    try {
      const file: File | null = await this.fileModel.findOne({
        where: {
          uuid
        },
      });
      if (file) {
      await file.destroy();
    }
      return ResultGenerator.genDefaultSuccessResult();
    } catch(e) {
      console.error(e)
      return ResultGenerator.genFailResult(500, '服务端错误');
    }
  }

  async getByUUId(uuid: string) {

    const data: File | null = await this.fileModel.findOne({
      where: {
        uuid: uuid
      }
    });
    if (data) {
      return ResultGenerator.genSuccessResult(data);
    }
  }

}

// SELECT count(`Comment`.`id`) AS `count` FROM `comment` AS `Comment` LEFT OUTER JOIN `reply` AS `replies` ON `Comment`.`id` = `replies`.`commentId` LEFT OUTER JOIN `user` AS `replies->user` ON `replies`.`userId` = `replies->user`.`id` LEFT OUTER JOIN `user` AS `user` ON `Comment`.`userId` = `user`.`id` WHERE `Comment`.`articleId` = 96;
