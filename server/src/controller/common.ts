import { CommonService } from '@/service/common';
import { Controller, Get,  Res } from '@nestjs/common';


@Controller('*')
export class CommonController{
  constructor(private commonService: CommonService) {}

  @Get()
  async catchAll(@Res() response: any) {
    return await this.commonService.catchAll(response);
  }
}
