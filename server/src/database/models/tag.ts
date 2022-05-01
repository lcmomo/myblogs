import { DataType, Model, Table, Column, HasMany, BelongsToMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import * as dayjs from 'dayjs';
import { Article } from './article';

@Table({
  tableName: 'tag',
  timestamps: false
})
class Tag extends Model {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;


  @Column({
    type: DataType.TEXT,
    allowNull: false,
    comment: '标签名称'
  })
  name!: string;

  @ForeignKey(() => Article)
  @Column({
    type: DataType.INTEGER({ length: 11}),
  })
  articleId!: number;

  // @Column({
  //   type: DataType.DATE,
  //   defaultValue: DataType.NOW,
  //   get() {
  //     const _this = this;
  //     // console.log("di:      ", this.getDataValue('createdAt'))
  //     return dayjs(_this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
  //   }
  // })
  // createdAt?: string;
  // @Column({
  //   type: DataType.DATE,
  //   defaultValue: DataType.NOW,
  //   get() {
  //     return dayjs(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
  //   }
  // })
  // updatedAt?: string;



  @BelongsTo(() => Article, {
    foreignKey: 'articleId',
    targetKey: 'id',
      constraints: false
  })
  article!: Article;
}

export { Tag };