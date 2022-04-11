
import { UserDto } from '../models/dto/user';
import { Inject, Injectable } from '@nestjs/common';
import { Article } from '../database/models/article';
import {  ResultGenerator } from '../core/result_generator';
import { createToken } from '../utils/token';
import { ArticleListQueryParams } from '@/models/dto/article';
import { Op } from 'sequelize';
import { Order } from 'sequelize/types/lib/model';
import { Comment, Reply, Tag, User } from '@/database/models';

const {
  not,
  like,
  or,
} = Op;

@Injectable()
export class ArticleService {

  constructor(@Inject('Article') private readonly articleModel: typeof Article){}
  async getAll(queryParams: ArticleListQueryParams) {

    const { page = 1, pageSize = 10, preview = 1, keyword = '', tag, category, order } = queryParams;
    const tagFilter = tag ? { name: tag } : null;
    const categoryFilter = category ? { name: category } : null;
    let articleOrder: Order = [['createdAt', 'DESC']];
    if (order) {
      articleOrder = [order.split(' ')] as Order;
    }
    try {
      const articleList =  await this.articleModel.findAndCountAll({
        where: {
          id: { [not]: -1 }, // 过滤关于页面副本
          [or]: {
            title: {
              [like]: `%${keyword}%`
            },
            content: {
              [like]: `%${keyword}%`
            }
          }
        },

        include: [
          { model: Tag, attributes: ['name'], where: tagFilter },
          // { model: CategoryModel, attributes: ['name'], where: categoryFilter },
          {
            model: Comment,
            attributes: ['id'],
            include: [{ model: Reply, attributes: ['id'] }]
          }
        ],
        offset: (page - 1) * pageSize,
        limit: parseInt(`${pageSize}`),
        order: articleOrder,
        distinct: true // count 计算
      });
      if (preview === 1) {
        articleList.rows.forEach(d => {
            d.content = d.content.slice(0, 1000) // 只是预览，减少大量的数据传输
        });
    }


      return ResultGenerator.genSuccessResult(articleList);
    } catch(err) {
      console.log(err);
      return ResultGenerator.genFailResult(500, '服务端错误')
    }
  }
  async getById(params: ArticleListQueryParams) {
    const { id, type } = params;
    const data = await this.articleModel.findOne({
      where: {
        id: params.id
      },
      include: [
        {model: Tag, attributes: ['name']},
        {
          model: Comment, attributes: ['id', 'content', 'createdAt'],
          include: [
            {
              model: Reply, attributes: ['id', 'content', 'createdAt'],
              include: [{ model: User, as:  'user', attributes: { exclude: ['updatedAt', 'password'] }}]
            },
            {model: User, as: 'user', attributes: { exclude: ['updatedAt', 'password']}}
          ],
          // row: true
        }
      ],
      // order :[
      //   [ArticleComment, 'createdAt','DESC'],
      // //  [[ArticleComment, Reply, 'createdAt', 'ASC']]
      // ],
      // row: true
    });
    type === 1 && this.articleModel.update({viewCount: ++data.viewCount}, {where: {id}});

    data.comments.forEach(comment => {
      comment.user.github = JSON.parse(comment.user.github)
      comment.replies.forEach(reply => {
        reply.user.github = JSON.parse(reply.user.github)
      })
    });
    return ResultGenerator.genSuccessResult(data, 'SUCCESS')
  }
}