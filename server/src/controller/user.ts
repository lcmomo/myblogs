import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors} from '@nestjs/common';
import { UserService } from '../service/user';
import { UserDto, UserQueryParams } from '../models/dto/user';
import { AuthToken, AuthAdmin } from '../interceptors';
import { API_PATH } from '@/config';

@Controller(`${API_PATH}/user`)
export class UserController {
  constructor(private userService:  UserService) {}

  @Get('info')
  @UseInterceptors(AuthToken, AuthAdmin)
  async getAll() {
    return await this.userService.findAll();
  }

  @Get('list')
  @UseInterceptors(AuthToken, AuthAdmin)
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
  @UseInterceptors(AuthToken, AuthAdmin)
  async delete(@Param('id') userId: number) {
    return await this.userService.delete(userId);
  }
  
  @Put('update-avatar')
  @UseInterceptors(AuthToken)
  async updateAvatar(@Body() user: UserDto) {
    return await this.userService.updateAvatar(user);
  }

}
