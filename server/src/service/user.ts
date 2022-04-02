
import { UserDto, UserQueryParams } from '../models/dto/user';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '../database/models/user';
import {  ResultGenerator } from '../core/result_generator';
import { createToken } from '../utils/token';
import { Op } from 'sequelize';

const { or, not, between, like } = Op;
@Injectable()
export class UserService {
  constructor(@Inject('User') private readonly UserModel: typeof User){}
  async findAll() {
    return  await this.UserModel.findAll({
    })
  }

  async defaultLogin(user: UserDto) {
    try {
      const { account, password } = user;
      const currentUser = await this.UserModel.findOne({
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
          const { id, role, username } = currentUser;
          const token = createToken({username, userId: id, role });
          return ResultGenerator.genSuccessResult({ username: currentUser.username, role, userId: id, token })
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
     const result = await this.UserModel.findOne({
       where: {
         email
       }
     });
     if (result) {
       return ResultGenerator.genFailResult(403, '邮箱已被注册');
     } else {
       const user = await this.UserModel.findOne({
         where: { username }
       });
       if (user && !user.github) {
         return ResultGenerator.genFailResult(403, '用户名已被占用');
       } else {
         await this.UserModel.create({username, password, email});
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
        console.log("username: ", username);
        where.username = {};
        where.username = { [like]: `%${username}%` }
      }
      if (type) {
        where.github = parseInt(type as string) === 1 ? { [not]: null} : null
      }

      if (Array.isArray(rangeDate) && rangeDate.length === 2) {
        where.createdAt = { [between]: rangeDate}
      }

      const result = await this.UserModel.findAndCountAll({
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

 async  delete(userId: number) {
  //  6
 }
}