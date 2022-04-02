import { SequelizeOptions } from "sequelize-typescript";

export const isDev: boolean = process.env.NODE_ENV === 'development';


export const devConfig: SequelizeOptions = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'myblogs',
  password: 'myblogs',
  database: 'myblogs_test'
}

export const prodConfig: SequelizeOptions = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: ''
}

export const dataBaseConfig = isDev ? devConfig : prodConfig;

export const TOKEN = {
  secret: 'chao',
  expiresIn: '10h'
}