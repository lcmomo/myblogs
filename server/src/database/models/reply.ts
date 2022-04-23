import { DataType, Model, Table, Column, HasMany, BelongsToMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import * as dayjs from 'dayjs';
import { Article } from './article';
import { User } from './user';
import {Comment } from './comment';

@Table({
  tableName: 'reply',
  timestamps: false
})
class Reply extends Model {
  [x: string]: any;
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @ForeignKey(() => Article)
  @Column({
    type: DataType.INTEGER({ length: 11}),
  })
  articleId!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    comment: '回复内容'
  })
  content!: string;



  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    get() {
      const _this = this;
      // console.log("di:      ", this.getDataValue('createdAt'))
      return dayjs(_this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
    }
  })
  createdAt?: string;
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    get() {
      return dayjs(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  })
  updatedAt?: string;

  @ForeignKey(() => User)
  @Column(
    DataType.INTEGER({length: 11}),
  )
  userId!: number;

  @ForeignKey(() => Comment)
  @Column(
    DataType.INTEGER({length: 11})
  )
  commentId!: number;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
    targetKey: 'id',
      constraints: false
  })
  user!: User;

  @BelongsTo(() => Comment, {
    foreignKey: 'commentId',
    targetKey: 'id',
      constraints: false
  })
  comment!: Comment;
}





export { Reply };