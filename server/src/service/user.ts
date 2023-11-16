
import { UserDto, UserQueryParams } from '../models/dto/user';
import { Inject, Injectable } from '@nestjs/common';
import { User, Comment, Reply } from '../database/models';
import {  ResultGenerator } from '../core/result_generator';
import { createToken } from '../utils/token';
import { Op } from 'sequelize';

const { or, not, between, like } = Op;
@Injectable()
export class UserService {
  constructor(
    @Inject('User') private readonly userModel: typeof User,
    @Inject('Comment') private readonly commentModel: typeof Comment,
    @Inject('Reply') private readonly replyModel: typeof Reply
  ){}
  async findAll() {
    return  await this.userModel.findAll({
    })
  }

  async defaultLogin(user: UserDto) {
    try {
      const { account, password } = user;
      const currentUser = await this.userModel.findOne({
        where: {
          // email: account,
          [or]: {
            email: account,
            username: account
          }
        }
      });

      if (!currentUser) {
        return ResultGenerator.genFailResult(403, '用户不存在');
      } else {
        const isMatch = password === currentUser.password;
        if (!isMatch) {
          return ResultGenerator.genFailResult(403, '密码不正确')
        } else {
          const { id, role, username, avatar } = currentUser;
          const token = createToken({username, userId: id, role,avatar });
          return ResultGenerator.genSuccessResult({ username: currentUser.username, role, userId: id, token, avatar })
        }
      }
    } catch(err) {
      return ResultGenerator.genFailResult(500, '服务端错误');
    }
  }
  async githubLogin(user: UserDto) {
    
  }
  async register(user: UserDto) {
    try {
     const { username, password, email} = user;
     const result = await this.userModel.findOne({
       where: {
         email
       }
     });
     if (result) {
       return ResultGenerator.genFailResult(403, '邮箱已被注册');
     } else {
       const user = await this.userModel.findOne({
         where: { username }
       });
       if (user && !user.github) {
         return ResultGenerator.genFailResult(403, '用户名已被占用');
       } else {
         await this.userModel.create({username, password, email});
         return ResultGenerator.genSuccessResult(null, '注册成功');
       }
     }
    }catch(err) {
      return ResultGenerator.genFailResult(500, '服务端错误');
    }
  }

  async list(query: UserQueryParams) {
    try {
      const { page = 1, pageSize = 10, username, type, rangeDate} = query;
      const where: any = {
        role: { [not]: 1 }
      }

      if (username) {
        where.username = {};
        where.username = { [like]: `%${username}%` }
      }
      if (type) {
        where.github = parseInt(type as string) === 1 ? { [not]: null} : null
      }

      if (Array.isArray(rangeDate) && rangeDate.length === 2) {
        where.createdAt = { [between]: rangeDate}
      }

      const result = await this.userModel.findAndCountAll({
        where,
        offset: (page - 1) * pageSize,
        limit: parseInt(pageSize as unknown as string),
        // rows: true
        order: [['createdAt', 'DESC']]
      });

      return ResultGenerator.genSuccessResult(result)
    } catch(e) {
     return ResultGenerator.genFailResult(500, '服务端错误');
    }
  }

 async delete(userId: number) {
  //  6
  try {
    // 删除用户的同时会删除评论和回复
    await this.replyModel.destroy({ where: { userId } });
    await this.commentModel.destroy({ where: { userId }});
    await this.userModel.destroy({ where: { id: userId }});
    return ResultGenerator.genSuccessResult(null, '操作成功');
  } catch(e) {
    return ResultGenerator.genFailResult(500, '服务端错误');
  }

 }

 async updateAvatar(user: UserDto) {

    try {
      const { avatar, userId } = user;
      const currentUser = await this.userModel.findOne({
        where: {
          id: userId
        }
      });
      if (currentUser) {
        await this.userModel.update({ avatar, updatedAt: Date.now()}, { where: { id: userId }});
      }
      const result = await this.userModel.findOne({
        where: {
          id: userId
        }
      });
      return ResultGenerator.genSuccessResult(result, '更新成功')
    } catch (e) {
      return ResultGenerator.genFailResult(500, '服务端错误');
    }
  }


 }
