
import { ReplyService } from '@/service/reply';
import { Body, Controller, Delete, Get, Param, Post, Query, UseInterceptors} from '@nestjs/common';



@Controller('/reply')
export class ReplyController{
  constructor(private replyService: ReplyService) {}

  @Get('list')
  async getAll() {
    return await this.replyService.getAll();
  }
  @Delete(':replyId')
  async delete(@Param('replyId') replyId: number) {
    return this.replyService.delete(replyId);
  }
}
