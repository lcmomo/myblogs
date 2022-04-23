
import { DataType, Model, Table, Column, HasMany, ForeignKey } from 'sequelize-typescript';
import * as dayjs from 'dayjs';
import { Comment } from './comment';
import { Reply } from './reply';


@Table({
  tableName: 'user',
  timestamps: false
})
class User extends Model {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    comment: '通过bcrypt 加密后的密码'
  })
  password!: string;

  @Column({
    type: DataType.STRING(50)
  })
  email!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  notice!: string;

  @Column({
    type: DataType.TINYINT,
    defaultValue: 2,
    comment: '用户权限： 1 - admin，2， 普通用户'
  })
  role!: number;

  @Column({
    type: DataType.TEXT // github 登录用户，直接绑定user表
  })
  github!: string;

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

  

  @HasMany(() => Comment, {
    foreignKey: 'userId'
  })
  comments!: Comment[];
  
  @HasMany(() => Reply)
  replys!: Reply[]
}



// const userModel = (sequelize: Sequelize) => {
//   User.init()
//   User.init(
//     {
//       // id sequelize    默认创建
//       id: {
//         type: DataType.INTEGER({ length: 11 }),
//         primaryKey: true,
//         autoIncrement: true
//       },
//       username: {
//         type: DataType.STRING(50),
//         allowNull: false
//       },
//       password: {
//         type: DataType.STRING,
//         comment: '通过bcrypt 加密后的密码'
//       },
//       email: {
//         type: DataType.STRING(50)
//       },
//       notice: {
//         type: DataType.BOOLEAN, // 是否开启邮件通知
//         defaultValue: true
//       },
//       role: {
//         type: DataType.TINYINT,
//         defaultValue: 2,
//         comment: '用户权限： 1 - admin，2， 普通用户'
//       },
//       github: {
//         type: DataType.TEXT // github 登录用户，直接绑定user表
//       },
//       createdAt: {
//         type: DataType.DATE,
//         defaultValue: DataType.NOW,
//         get() {
//           const _this = this;
//           // console.log("di:      ", this.getDataValue('createdAt'))
//           return dayjs(_this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
//         }
//       },
//       updatedAt: {
//         type: DataType.DATE,
//         defaultValue: DataType.NOW,
//         get() {
//           return dayjs(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
//         }
//       }
//     },
//     {
//       timestamps: false,
//       tableName: 'user',
//       sequelize: sequelize
//     }
//   );
// }

export { User };