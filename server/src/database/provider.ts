import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { dataBaseConfig } from '../config';
import { User, Article, Comment, Tag, Reply, File as MyFile } from './models';
export const dataBaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      const sequelize = new Sequelize({...dataBaseConfig});
      sequelize.addModels([Reply, Article, Comment, User, Tag, MyFile]);
      return sequelize;
    }
  },
  {
    provide: "User",
    useValue: User,
    inject: ["sequelize"],
  },
  {
    provide: "Article",
    useValue: Article,
    inject: ["sequelize"],
  },
  {
    provide: "Comment",
    useValue: Comment,
    inject: ["sequelize"],
  },
  {
    provide: "Reply",
    useValue: Reply,
    inject: ["sequelize"],
  },
  {
    provide: "Tag",
    useValue: Tag,
    inject: ["sequelize"],
  },
  {
    provide: "MyFile",
    useValue: MyFile,
    inject: ["sequelize"],
  },
]
