import { DataType, Model, Table, Column, HasMany } from 'sequelize-typescript';
import * as dayjs from 'dayjs';
import { Comment } from './comment';
import { Reply } from './reply';
import { Tag } from './tag';
@Table({
  tableName: 'article',
  timestamps: false
})
class Article extends Model {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    comment: '文章内容'
  })
  content!: string;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    defaultValue: 0,
    comment: '阅读数'
  })
  viewCount!: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    get() {
      const _this = this;
      return dayjs(_this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
    }
  })

  createdAt!: string;
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    get() {
      return dayjs(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  })
  updatedAt?: string;

  @HasMany(() => Comment)
  comments!: Comment[];

  @HasMany(() => Reply)
  replies!: Reply[];

  @HasMany(() => Tag)
  tags!: Tag[]
}

export { Article };