
import { Inject, Injectable } from '@nestjs/common';
import {  ResultGenerator } from '../core/result_generator';
import { Tag } from '@/database/models';
import { Op, col, fn } from 'sequelize';

const {
  not,
  like,
  or
} = Op;

@Injectable()
export class TagService {
  constructor(@Inject('Tag') private readonly tagModel: typeof Tag){}
  async getAll() {
    try {
      const data = await this.tagModel.findAll({
        attributes: ['name', [fn('COUNT', col('name')), 'count']],
        group: 'name',
        where: {
          articleId: { [not]: null}
        },
        order: [[fn('COUNT', col('name')), 'desc']]
      });
      return ResultGenerator.genSuccessResult(data);
    }
    catch(err) {
      console.log(err);
      return ResultGenerator.genFailResult(500, '服务端错误')
    }
  }
}