import { join } from "path";
import { SequelizeOptions } from "sequelize-typescript";

export const isDev: boolean = process.env.NODE_ENV === 'development';


export const devConfig: SequelizeOptions = {
  dialect: 'mysql',
  host: 'blog.llchaoblogs.work',
  port: 3306,
  username: 'myblogs',
  password: 'myblogs',
  database: 'myblogs_test'
}

export const prodConfig: SequelizeOptions = {
  dialect: 'mysql',
  host: 'blog.llchaoblogs.work',
  port: 3306,
  username: 'myblogs',
  password: 'myblogs',
  database: 'myblogs_test'
}

export const dataBaseConfig = isDev ? devConfig : prodConfig;

export const TOKEN = {
  secret: 'chao',
  expiresIn: '10min'
}

export const USER_ROLES = {
  ADMIN: 1,
  USER: 2
}

export const API = '/api';
export const API_VERSION = '/v1';
export const API_PATH = `${API}${API_VERSION}`;

export const staticFileDir = isDev ? join(__dirname, '../upload'): join(process.cwd(), '../../../static-file/upload')