
import { UserDto } from '../models/dto/user';
import { Inject, Injectable } from '@nestjs/common';
import { Article } from '../database/models/article';
import {  ResultGenerator } from '../core/result_generator';
import { createToken } from '../utils/token';
import { ArticleAddBody, ArticleListQueryParams } from '@/models/dto/article';
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

  constructor(@Inject('Article') private readonly articleModel: typeof Article,
    @Inject('Tag') private readonly tagModel: typeof Tag
  ){}
  async getAll(queryParams: ArticleListQueryParams) {

    const { page = 1, pageSize = 10, preview = 1, keyword = '', tag, order } = queryParams;
    const tagFilter = tag ? { name: tag } : undefined;
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
        articleList.rows.forEach((d: Article) => {
            d.content = d.content && d.content.slice(0, 1000) // 只是预览，减少大量的数据传输
        });
    }


      return ResultGenerator.genSuccessResult(articleList);
    } catch(err) {
      return ResultGenerator.genFailResult(500, '服务端错误')
    }
  }
  async getById(params: ArticleListQueryParams, query: ArticleListQueryParams) {
    const { id } = params;
    const { type } = query;
    const data: Article | null = await this.articleModel.findOne({
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
    if (data) {
      Number(type) === 1 &&  (await this.articleModel.update({viewCount: ++data.viewCount}, {where: {id}})); // 查看文章详情，则浏览数+1
      data.comments.forEach(comment => {
        if (comment.user.github){
          comment.user.github = JSON.parse(comment.user.github);
        }
        comment.replies && comment.replies.forEach(reply => {
          if (reply && reply.user && reply.user.github) {
            reply.user.github = JSON.parse(reply.user.github);
          }
        });
      });
    }
    return ResultGenerator.genSuccessResult(data, 'SUCCESS')
  }

  async add(article: ArticleAddBody) {
    try {
      let { title, content, tags = [], authorId } = article;
      const result = await this.articleModel.findOne({ where: { title }});
      if (result) {
        return ResultGenerator.genFailResult(403, '文章已存在，创建失败');
      } else {
        tags = tags.map(t => ({ name: t }));
        const data = await this.articleModel.create({
        title, content, authorId, tags
        }, { include: [Tag]});
        return ResultGenerator.genSuccessResult(data, '创建成功！')
      }
    } catch(e) {
      return ResultGenerator.genFailResult(500, '服务端错误');
    }
  }
  async update(article: ArticleAddBody) {
    try {
      const { title, content, tags = [], articleId } = article;
      const tagList = tags.map(t => ({ name: t, articleId }));
      const result = await this.articleModel.update({title, content}, { where: { id: articleId }});
      await this.tagModel.destroy({where: { articleId }});
      await this.tagModel.bulkCreate(tagList);
      return ResultGenerator.genSuccessResult(200, '更新成功')
    } catch (e) {
      return ResultGenerator.genFailResult(500, '服务端错误');
    }
  }

  async delete(id: number) {
    try {
      await this.articleModel.destroy({ where: { id }});
      return ResultGenerator.genSuccessResult(null, '删除成功');
    } catch(e) {
      return ResultGenerator.genFailResult(500, '服务端错误');
    }
  }
}