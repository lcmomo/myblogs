import useBreadcrumb from '@/hooks/use_breadcrumb';
import MdEditor from '@/pages/components/md_editor';
import MyIcon from '@/pages/components/my_icon';
import { selectorTags } from '@/store/slice/article';
import { selectorUser } from '@/store/slice/user';
import request from '@/utils/request';
import { BackTop, Button, Input, message, Modal } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import AppTag from './tag';

type ArticleEditProps = {
  history: History,
  location: Location,
  match: Record<string, any>
}

const ArticleEdit: FC<ArticleEditProps> = (props: ArticleEditProps) => {

  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [tagList, setTagList] = useState([])
  const [tagSelectedList, setTagSelectedList] = useState([])
  const storeTagList = useSelector(selectorTags);
  const authorId = useSelector(selectorUser).userId;
  const history = useHistory();
  const location = useLocation();
  const historyState = history.location.state as Record<string, unknown>;
  // const articleId = historyState?.articleId as number;
  const articleId = props.match.params.id;
  console.log('ar: ', props)
  useBreadcrumb([{ link: '/admin/article/manager', name: '文章管理' }, articleId ? '编辑文章' : '新增文章']);
  useEffect(() => {
    if (articleId) {
      fetchArticle(articleId);
    }
  }, [props.match.params.id]);
  console.log('location: ', location)

  async function fetchArticle(id: number) {
    const { title, content, tags } =  await request(`/article/${id}?type=0`);
    setTitle(title);
    setContent(content);
    console.log('fetch: ', content)
    const tagsList = tags.map((d: any) => d.name);
    setTagList(tagsList);
  }

  async function add() {
    if (!title) return message.warning('标题不能为空！');
    const payload = {
        title,
        content,
        tags: tagSelectedList,
        authorId: authorId
    }
    const { id } =  await request('/article', { method: 'POST', body: payload});
      Modal.confirm({
        title: '文章创建成功！是否前往查看？',
        onOk: () => history.push(`/article/${id}`),
        okText: '确定',
        cancelText: '取消'
      });
  }
  async function update() {
    await request(`/article`, {
      method: 'PUT',
      body: {
        title,
        content,
        tags: tagSelectedList,
        articleId
      }
      });
    message.success('更新成功');
    setTimeout(() => {
      history.push(`/admin/article/list`);
    }, 500);

  }

  return (
    <div className="admin-edit-article">
      <ul className="form-list">
      <li>
          <span className='label'>标题：</span>
          <span style={{ flex: 1 }}>
            <Input
              placeholder='请输入文章标题'
              className='title-input'
              name='title'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </span>
        </li>
        <li>
          <span className='label'>标签：</span>
          <span>
            <AppTag
              list={tagList}
              setList={setTagList}
              selectedList={tagSelectedList}
              setSelectedList={setTagSelectedList}
            />
          </span>
        </li>
      </ul>
      {/* <MdEditor value={content} onChange={setContent} /> */}
      <MdEditor value={content} onChange={setContent} />
      <Button
        type='primary'
        shape='circle'
        size='large'
        disabled={!title}
        // className='action-icon'
        title={articleId ? '更新' : '新增'}
        onClick={() => {
          articleId ? update() : add()
        }}
      >
        <MyIcon  type={ articleId ? 'icon-edit-square' : 'icon-plus-square' } />
      </Button>
      {/* <BackTop target={() => document.querySelector('.admin-content-wrap')} /> */}
    </div>
  );
}

export default ArticleEdit;