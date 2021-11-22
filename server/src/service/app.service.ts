import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      username: 'li',
      role: 1,
      github: '',
      userId: 0,
    };
  }
}
