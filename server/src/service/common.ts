
import { Inject, Injectable} from '@nestjs/common';
import {  ResultGenerator } from '../core/result_generator';
import { join } from 'path';

@Injectable()
export class CommonService {
  constructor(){}
  async catchAll(res: any) {
    console.log("egr")
    res.sendFile(join(__dirname, '..', 'client', 'dist', 'index.html'));
  }
}
