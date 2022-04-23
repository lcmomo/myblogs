
import React, { FC, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import ArticleTag from '@/pages/components/article_tag';
import useAjaxLoading from '@/hooks/use_ajax_loading';
import MyIcon from '@/pages/components/my_icon';
import { translateMarkdown } from '@/utils/markdown';
import request from '@/utils/request';
import Spin from 'antd/lib/spin';
import { Drawer } from 'antd';
import Divider from 'antd/lib/divider';
import './style.less';
import Navigation from './navigation';
import { calcCommentsCount } from '@/utils';
import Discuss from '@/pages/components/discuss';
import { useSelector } from 'react-redux';
import { selectorComment } from '@/store/slice/comment';


export type ArticleProps = {
  title?: string;
  content?: string;
  tags?: Array<string>;
  comments?: Array<any>;
  createdAt?: string;
  viewCount?: number;
}
const Article: FC<{}> = (props: any) => {

  const [loading, withLoading] = useAjaxLoading();
  const [article, setArticle] = useState({
    title: '',
    content: '',
    tags: [],
    comments: [],
    createdAt: '',
    viewCount: 0
  });
  const [drawerVisible, setDrawerVisible] = useState(false);
  useEffect(() => {
    setTimeout(() =>{
      const hash = decodeURI(props.location.hash);
      const elem = document.querySelector(`a[href='${hash}'`)  as HTMLElement;
      elem && hash && elem.click() // 挂载时路由跳转到指定位置
    }, 500)
  }, [props.match.params.id]);

  useEffect(() => {
    if (typeof withLoading === 'function') {
      withLoading(request(`/article/${props.match.params.id}`, { params: { type: 1}})).then(res => {

        res.content = translateMarkdown(res.content);
        setArticle(res);
      }).catch(err => {
        props.history.push('/404');
      })
    }
  }, [props.match.params.id]);

  function setCommentList(list: any) {
    setArticle({...article, comments: list});
  }

  const { title, content, tags, comments, createdAt, viewCount } = article;
  const articleId = parseInt(props.match.params.id);
  const isFoldNavigation = useMediaQuery({query: '(max-width: 1300px)'});
  return (
    <Spin tip="Loading..." spinning={loading as boolean}>
      <article className="app-article" style={ {paddingRight: isFoldNavigation ? 0 : 275}}>
        <div className="post-header">
          <h1 className="post-title">{title}</h1>

          <div className="article-desc">
            <span className="post-time">
              <MyIcon type="icon-read" />
              &nbsp;发表于 &nbsp;&nbsp;
              <span>
                {createdAt.slice(0,10)}
              </span>
            </span>
              <ArticleTag tagList={tags} />
              <Divider type='vertical' />
              <a className="comment-count" href="#discuss" style={ {color: "inherit"}}>
                <MyIcon type="icon-message" />
                <span style={{marginRight: 5}}>{calcCommentsCount(comments)}</span>
              </a>
              <MyIcon type="icon-eye" styles={{marginRight: 2}}/>
              <span>{viewCount}</span>
          </div>
        </div>
        <div className="article-detail" dangerouslySetInnerHTML={{ __html: content }} />
        {
          isFoldNavigation ? (
          <>
            <div className="drawer-btn" onClick={e => setDrawerVisible(true)}>
              <MyIcon type="icon-menu" className="" />
            </div>
            <Drawer
              title={title}
              placement="right"
              closable={false}
              onClose={e => setDrawerVisible(false)}
              visible={drawerVisible}
              getContainer={() => document.querySelector(".app-article")}
            >
              <div className="right-navigation">
                <Navigation content={content} />
              </div>
            </Drawer>
          </>
          ) : (
            <nav className="article-navigation">
              <Navigation content={content} />
            </nav>
          )
        }

        <Discuss articleId={articleId} commentList={comments} setCommentList={setCommentList} />
      </article>
    </Spin>
  )
}

export default Article;