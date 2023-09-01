import { CommonService } from '@/service/common';
import { Controller, Get,  Res } from '@nestjs/common';
import { join } from 'path';


@Controller('*')
export class CommonController{
  constructor(private commonService: CommonService) {}

  @Get()
  async catchAll(@Res() response: any) {
    console.log("egr")
    response.sendFile(join(__dirname, '../../../', 'client', 'dist', 'index.html'));
  }
}
