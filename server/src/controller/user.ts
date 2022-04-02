import { Body, Controller, Delete, Get, Param, Post, Query, UseInterceptors} from '@nestjs/common';
import { UserService } from '../service/user';
import { UserDto, UserQueryParams } from '../models/dto/user';
import { AuthToken } from '../interceptors/auth_token';

@Controller('/user')
export class UserController {
  constructor(private userService:  UserService) {}

  @Get('info')
  async getAll() {
    return await this.userService.findAll();
  }

  @Get('list') 
    async list(@Query() query: UserQueryParams) {
      return await this.userService.list(query);
  }

  @Post('login')
  async login(@Body() user: UserDto) {
    const { code } = user;
    if (code) {
      await this.userService.githubLogin(user);
    } else {
      return ( await this.userService.defaultLogin(user));
    }
  }
  @Post('register')
  async register(@Body() user: UserDto) {
    return await this.userService.register(user);
  }

  @Delete(':id')
  async delete(@Param() userId: number) {

  }
}
