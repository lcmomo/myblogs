
import { Inject, Injectable } from '@nestjs/common';
import {  ResultGenerator } from '../core/result_generator';
import { Reply, Tag } from '@/database/models';
import { Op, col, fn } from 'sequelize';

const {
  not,
  like,
  or
} = Op;

@Injectable()
export class ReplyService {
  constructor(@Inject('Reply') private readonly replyModel: typeof Reply){}
  async getAll() {
    try {
      const data = await this.replyModel.findAll({
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
      return ResultGenerator.genFailResult(500, '服务端错误');
    }
  }
  async delete(replyId: number) {
    try {
      await this.replyModel.destroy({ where: { id: replyId } });
      return ResultGenerator.genDefaultSuccessResult();
    } catch(err) {
      return ResultGenerator.genFailResult(500, '服务端错误');
    }
  }
}