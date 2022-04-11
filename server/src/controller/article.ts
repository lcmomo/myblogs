import { ArticleListQueryParams } from '@/models/dto/article';
import { ArticleService } from '@/service/article';
import { Body, Controller, Get, Param, Post, Query, UseInterceptors} from '@nestjs/common';



@Controller('/article')
export class ArticleController{
  constructor(private articleService: ArticleService) {}

  @Get('list')
  async getAll(@Query() params: ArticleListQueryParams) {
    return await this.articleService.getAll(params);
  }
  @Get(':id')
  async getById(@Param() params: ArticleListQueryParams) {
 
    return await this.articleService.getById(params);
  }
}
