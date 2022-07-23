import MyIcon from '@/pages/components/my_icon';
import { calcCommentsCount } from '@/utils';
import Divider from 'antd/lib/divider';
import React, { FC } from 'react'
import { useHistory } from 'react-router-dom';
import ArticleTag from '@/pages/components/article_tag';

type ArticleListProps = {
  list: Array<any>
}
const ArticleList: FC<ArticleListProps> = (props) =>  {
  const history = useHistory();
  const {list} = props;

  function jumpTo(id: number) {
    history.push(`/article/${id}`);
  }

  return (
    <ul className="app-home-list">
      {
        list.map(item => (
          <li key={item.id} className="app-home-list-item">
            <Divider orientation="left">
              <span className="title" onClick={() => jumpTo(item.id)}>
                {item.title}
              </span>
              <span className="posted-time">{item.createdAt.slice(0, 10)}</span>
            </Divider>

            <div
              onClick={() => jumpTo(item.id)}
              className="article-detail content"
              dangerouslySetInnerHTML={ { __html: item.content } }
            />

            <div className="list-item-others">
              <MyIcon type="icon-message" styles={ {marginRight: '5px'}} />
              <span>{calcCommentsCount(item.comments)}</span>
              <MyIcon type="icon-eye" styles={ {marginRight: '5px'}}  />
              <span>{item.viewCount}</span>
              <ArticleTag tagList={item.tags} />
            </div>

          </li>
        ))
      }
    </ul>
  )
}

export default ArticleList;
