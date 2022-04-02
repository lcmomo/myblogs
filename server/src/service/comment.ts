

import { Inject, Injectable } from '@nestjs/common';

import {  ResultGenerator } from '../core/result_generator';

import { Comment, Reply, User } from '@/database/models';
import { Op, col, fn } from 'sequelize';
import { CommentDto } from '@/models/dto/comment';

const {
  not
} = Op;

@Injectable()
export class CommentService {
  constructor(@Inject('Comment') private readonly commentModel: typeof Comment, @Inject('Reply') private readonly replyModel: typeof Reply){}
  async getAll() {
    try {
      const data = await this.commentModel.findAll({
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

  async create(comment: CommentDto) {
    try {
    const { articleId, userId, content } = comment;
    let { commentId } = comment;
    // 添加评论
    if (!commentId) {
      const comment = await this.commentModel.create({ userId, articleId, content });
      commentId = comment.id;
    } else{
      // 回复
      await this.replyModel.create({ userId, articleId, content, commentId });
    }
    const list = await this.fetchCommentList(articleId);
    return ResultGenerator.genSuccessResult(list);
  } catch (e) {
    console.log("e", e)
    return ResultGenerator.genFailResult(500, '服务端错误');
  }
  }

   async fetchCommentList(articleId: number) {
    const data = await this.commentModel.findAndCountAll({
      where: { articleId },
      attributes: ['id', 'content', 'createdAt'],
      include: [
        {
          model: Reply, attributes: ['id', 'content', 'createdAt'],
          include: [{
            model: User, as: 'user', attributes: { exclude: ['updatedAt', 'password']}
          }]
        },
        { model: User, as: 'user', attributes: { exclude: ['updatedAt', 'password']}}
      ],
      // // row: true,
      order: [['createdAt', 'DESC'],
      ['replies', 'createdAt', 'ASC']
    ],
    });
    data.rows.forEach(comment => {
      comment.user.github = JSON.parse(comment.user.github)
      comment.replies.forEach(reply => {
        reply.user.github = JSON.parse(reply.user.github)
      })
    });
    return data;
  }

  async delete(commentId: number) {
    console.log("id: ", commentId)
    try {
      const comment = await this.commentModel.findOne({
        where: {
          id: commentId
        },
        include: [{ model: Reply, as: 'replies'}]
      });
      console.log("comment: ", comment);
      if (comment.replies && comment.replies.length) {
        for await (const reply of comment.replies) {
          reply.destroy();
        }
      }
      await comment.destroy();
      return ResultGenerator.genDefaultSuccessResult();
    } catch(e) {
      console.error(e)
      return ResultGenerator.genFailResult(500, '服务端错误');
    }
  }
}

// SELECT count(`Comment`.`id`) AS `count` FROM `comment` AS `Comment` LEFT OUTER JOIN `reply` AS `replies` ON `Comment`.`id` = `replies`.`commentId` LEFT OUTER JOIN `user` AS `replies->user` ON `replies`.`userId` = `replies->user`.`id` LEFT OUTER JOIN `user` AS `user` ON `Comment`.`userId` = `user`.`id` WHERE `Comment`.`articleId` = 96;
