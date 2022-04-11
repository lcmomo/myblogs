import { Module } from '@nestjs/common';
import { dataBaseProviders } from './provider';

@Module({
  providers: [...dataBaseProviders],
  exports: [...dataBaseProviders]
})
export class DataBaseModule {
  constructor() {
    console.log("database connected: ")
  }
}
