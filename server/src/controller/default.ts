import { DefaultService } from '@/service/default';
import { Controller, Get,  Res } from '@nestjs/common';
import { join } from 'path';


@Controller('*')
export class DefaultController{
  constructor(private defaultService: DefaultService) {}

  @Get()
  async catchAll(@Res() response: any) {
    response.sendFile(join(__dirname, '../../../', 'client', 'dist', 'index.html'));
  }
}
