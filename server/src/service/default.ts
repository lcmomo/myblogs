
import { Inject, Injectable} from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class DefaultService {
  constructor(){}
  async catchAll(res: any) {
    console.log("egr")
    res.sendFile(join(__dirname, '../../../', 'client', 'dist', 'index.html'));
  }
}
