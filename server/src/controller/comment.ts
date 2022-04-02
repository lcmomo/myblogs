
import { CommentDto } from '@/models/dto/comment';
import { CommentService } from '@/service/comment';
import { Body, Controller, Delete, Get, Param, Post, Query, UseInterceptors} from '@nestjs/common';



@Controller('/comment')
export class CommentController{
  constructor(private commentService: CommentService) {}

  @Get('list')
  async getAll() {
    return await this.commentService.fetchCommentList(96);
  }
  @Post('/')
  async create(@Body() comment: CommentDto) {
    return await this.commentService.create(comment);
  }

  @Delete(':commentId')
  async delete(@Param('commentId') commentId: number) {
    return await this.commentService.delete(commentId);
  }
}
