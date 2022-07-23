
import { TagService } from '@/service/tag';
import { Body, Controller, Get, Param, Post, Query, UseInterceptors} from '@nestjs/common';



@Controller('/tag')
export class TagController{
  constructor(private tagService: TagService) {}

  @Get('list')
  async getAll() {
    return await this.tagService.getAll();
  }
}
