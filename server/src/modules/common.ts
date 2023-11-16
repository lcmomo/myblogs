import { CommonController } from '@/controller/common';
import { dataBaseProviders } from '@/database/provider';
import { CommonService } from '@/service/common';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    MulterModule.register({
      dest: '@/upload', // 设置文件存储目录
    }),
  ],
  providers: [...dataBaseProviders],

})
export class FileUploadModule {}