import {  User } from "./user";
import { Article } from './article';
import { Comment } from './comment';
import { Reply } from './reply';
import { Tag } from './tag';


// const initModels = (sequelize: Sequelize): void => {
//  userModel(sequelize);
// };
/**
 * 两个表：article+location；
 * article中user_id: 表示类型1、2、3
 * location中type[外键：foreignKey]，表示1、2、3也就是对应article中user_id
 * 所以 location 是子表；article是父表
 * location.belongsTo(article)
 * article.hasOne(location)
 * eg
 * article表，父亲表：
 * id  |   title     |   user_id
 * 主键 | 文章标题信息  | 唯一类型，表示文章id
 *
 * location表，子表：
 * id  | other   | type
 * 主键 | 其他信息 | 外键，关联父亲表的user_id
 *
 *
 */

export { User, Comment, Article, Reply, Tag };
