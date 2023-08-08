import React, { FC, useMemo } from 'react';
import './style.less';

import { decodeQuery } from '@/utils';
import { translateMarkdown } from '@/utils/markdown';
import { HOME_PAGESIZE } from '@/utils/config';
import useFetchList from '@/hooks/use_fetch_list';
import { Empty, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import QuickLink from './quick_link';
import ArticleList from './list';
import Pagination from '@/pages/components/pagination'

const Home: FC<{}> = (props: any) => {
  const dispatch = useDispatch();
  const { loading, pagination, dataList } = useFetchList({
    requestUrl: '/article/list',
    queryParams: { pageSize: HOME_PAGESIZE },
    fetchDependence: [props.location.search]
  });

  const list = useMemo(() => {
    return [...dataList].map(item => {
      const index = item.content.indexOf('<!--more-->');
      item.content = translateMarkdown(item.content.slice(0, index));
      return item;
    });
  }, [dataList]);
  const { keyword } = decodeQuery(props.location.search);
  return (
    <Spin tip="Loading..." spinning={loading}>
      <div className="app-home">
        <ArticleList list={list} />
        <QuickLink list={list} />

        {
          list.length === 0 && keyword && (
            <div className='no-data'>
              <Empty description={
                (
                  <span> 未搜索到标题/内容含有 <span className="keyword">{keyword} </span>的文章</span>
                )
              } />
            </div>
          )
        }

        <Pagination
        { ...pagination}
          onChange={
            page => {
              // document.querySelector('.app-main').scrollTo = 0
              pagination.onChange(page)
            }
          }
        />
      </div>
    </Spin>
  )
}

export default  Home;
