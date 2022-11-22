import React from 'react';
import { ANNOUNCEMENT, SIDEBAR } from '@/config';
import Href from '@/pages/components/href';
import { Alert, Divider, Tag } from 'antd';
import useFetchList from '@/hooks/use_fetch_list';
import { Link } from 'react-router-dom';
export default function SideBar() {
    const { dataList: articleList } = useFetchList({
      withLoading: false,
      requestUrl: '/article/list',
      queryParams: {
        order: 'viewCount DESC',
        page: 1, 
        pageSize: 6
      }
    });

    const { dataList: tagList } = useFetchList({
      withLoading: false,
      requestUrl: '/tag/list',
      queryParams: {}
    })
  // }
  return (
    <aside className="app-sidebar">
      <img src={SIDEBAR.avatar} className="side-avatar" />
      <h2 className="title">{SIDEBAR.title}</h2>
      <h5>{SIDEBAR.subTitle}</h5>
      <ul className="home-pages">
        {
          Object.entries(SIDEBAR.homepages).map(([linkName, item]) => (
            <li key={linkName}>
              {item.icon}
              <Href href={item.link}>{linkName}</Href>
            </li>
          ))
        }
      </ul>
      {ANNOUNCEMENT.enable && <Alert message={ANNOUNCEMENT.content} type='info' />}
      <Divider orientation="left">推荐</Divider>
      <ul className='article-list'>
        {articleList.map(d => (
          <li key={d.id}>
            <Link to={`/article/${d.id}`}>{d.title}</Link>
          </li>
        ))}
      </ul>
      <Divider orientation="left">标签</Divider>
      <div className='tag-list'>
        {tagList.map((tag, i) => (
          <Tag key={i} color={tag.color}>
            {/* <Link to={`/tags/${tag.name}`}>{tag.name}</Link> */}
            {tag.name}
          </Tag>
        ))}
      </div>
    </aside>
  )
}
