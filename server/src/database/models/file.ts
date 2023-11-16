import { DataType, Model, Table, Column } from 'sequelize-typescript';
import * as dayjs from 'dayjs';

@Table({
  tableName: 'file',
  timestamps: false
})
class File extends Model {
  [x: string]: any;
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;


  @Column({
    type: DataType.STRING({ length: 11}),
    allowNull: true,
    comment: '文件uuid'
  })
  uuid!: string;

  @Column({
    type: DataType.STRING({ length: 11}),
    allowNull: true,
    comment: '文件名'
  })
  filename!: string;



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

}





export { File };