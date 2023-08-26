import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { UserController } from '../controller/user'
import { AppService } from '../service/app.service';
import  { DataBaseModule } from '../database/modules';
import { UserService } from '../service/user';
import { ArticleService } from '@/service/article';
import { ArticleController } from '@/controller/article';
import { TagController } from '@/controller/tag';
import { TagService } from '@/service/tag';
import { CommentService } from '@/service/comment';
import { CommentController } from '@/controller/comment';
import { ReplyController } from '@/controller/reply';
import { ReplyService } from '@/service/reply';
import { CommonService } from '@/service/common';
import { CommonController } from '@/controller/common';

@Module({
  imports: [DataBaseModule],
  controllers: [AppController, UserController, ArticleController, TagController, CommentController, ReplyController, CommonController],
  providers: [AppService, UserService, ArticleService, TagService, CommentService, ReplyService, CommonService],
})
export class AppModule  {}
