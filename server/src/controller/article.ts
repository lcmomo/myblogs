import { ArticleAddBody, ArticleListQueryParams } from '@/models/dto/article';
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
  async getById(@Param() params: ArticleListQueryParams, @Query() query: ArticleListQueryParams) {
 
    return await this.articleService.getById(params, query);
  }
  
  @Post('')
  async add(@Body() article: ArticleAddBody) {
    return await this.articleService.add(article);
  }
}
