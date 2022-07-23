import { selectorTags } from '@/store/slice/article';
import Divider from 'antd/lib/divider';
import Tag from 'antd/lib/tag';
import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import MyIcon from '../my_icon';

function getColor(name: any, colorList: any[]) {
  const target = colorList.find((c: { name: any; }) => c.name === name);
  return target ? target.color: '';
}
type ArticleTagProps  = { 
  tagList: Array<any>
}
type ArticleTagWithRouterProps = RouteComponentProps & ArticleTagProps;
const ArticleTag: FC<ArticleTagWithRouterProps> = (props) => {

  const tagColorList = useSelector(selectorTags);
  const { tagList } = props;
  return (
    <>
      {
        tagList.length > 0 && (
        <>
          <Divider type="vertical" style={{marginRight: 7}} />
          <MyIcon type="icon-tags" styles={{marginRight: 7}} />
          {tagList.map((tag, i) => (
            <Tag key={i} color={getColor(tag.name, tagColorList)}>
              <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
            </Tag>
          ))}
        </>
        )
      }
    </>
  )
}

export default withRouter(ArticleTag);

