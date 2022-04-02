"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("../controller/app.controller");
const user_1 = require("../controller/user");
const app_service_1 = require("../service/app.service");
const modules_1 = require("../database/modules");
const user_2 = require("../service/user");
const article_1 = require("../service/article");
const article_2 = require("../controller/article");
const tag_1 = require("../controller/tag");
const tag_2 = require("../service/tag");
const comment_1 = require("../service/comment");
const comment_2 = require("../controller/comment");
const reply_1 = require("../controller/reply");
const reply_2 = require("../service/reply");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [modules_1.DataBaseModule],
        controllers: [app_controller_1.AppController, user_1.UserController, article_2.ArticleController, tag_1.TagController, comment_2.CommentController, reply_1.ReplyController],
        providers: [app_service_1.AppService, user_2.UserService, article_1.ArticleService, tag_2.TagService, comment_1.CommentService, reply_2.ReplyService],
    })
], AppModule);
exports.AppModule = AppModule;
