import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../service/app.service';

@Controller('/use')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  getHello(): object{
    return {
      data: this.appService.getHello()

    }
  }
}

