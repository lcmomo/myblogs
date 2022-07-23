import React, { ChangeEvent, FC, MouseEvent, useCallback, useState } from 'react';
import Form from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import MyIcon from '@/pages/components/my_icon';
import Button from 'antd/lib/button';
import { calcCommentsCount } from '@/utils';
import './index.less';
import { logout, selectorUser } from '@/store/slice/user';
import { useDispatch, useSelector } from 'react-redux';
import Menu from 'antd/lib/menu';
import useBus from '@/hooks/usebus';
import Dropdown from 'antd/lib/dropdown';
import Divider from 'antd/lib/divider';
import Comment from 'antd/lib/comment';
import AppAvatar from '../my_avatar';
import { message } from 'antd';
import CommentList from './list';
import { createCommentI } from '@/services/comment';

const FormItem = Form.Item;
const MenuItem = Menu.Item;
type EditorProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (event: MouseEvent<HTMLElement>) => void;
  submitting: boolean | ((request: Promise<any>) => Promise<any>);
  articleId: number;
}

type DiscussProps = {
  commentList: Array<any>;
  articleId?: number,
  setCommentList?: (list: any) => void;
}
const Editor: FC<EditorProps> = ({ onChange, value, submitting, onSubmit, articleId }) => (
  <div>
    <FormItem>
      <TextArea rows={4} placeholder="评论..." onChange={onChange} value={value} />
    </FormItem>
    <FormItem>
      <div className="controls">
        <MyIcon type="icon-info-circle" className="controls-tip-icon" />
        <span className="controls-tip">支持 Markdown 语法</span>
        <Button className="discuss-btn" htmlType="submit" loading={submitting as boolean} onClick={onSubmit} type="primary">
          {articleId !== -1 ? '添加评论': '留言'}
        </Button>
      </div>
    </FormItem>
  </div>
);

const Discuss: FC<DiscussProps> = ({ commentList, articleId, setCommentList }) => {
  const user = useSelector(selectorUser);
  const { username, role, userId }  = user;
  const dispatch = useDispatch();
  const bus = useBus();
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const handleMenuClick = useCallback((e) => {
    switch (e.key) {
      case 'login': {
        bus.emit('openSignModal', 'login');
        break;
      }
      case 'register': {
        bus.emit('openSignModal', 'register');
        break;
      }
      case 'logout': {
        dispatch(logout());
        break;
      }
      default:
      break;
    }
  }, [])
  const renderDropdownMenu = () => {
    return username ? (
      <Menu onClick={handleMenuClick}>
        <MenuItem key='logout'>注销</MenuItem>
      </Menu>
    ) : (
      <Menu onClick={handleMenuClick}>
        <MenuItem key='login'>登录</MenuItem>
        <MenuItem key='register'>注册</MenuItem>
      </Menu>
    );
  };

   async function handleSubmit() {
    if(!value) return;
    if (!user.username) return message.warn('您未登录，请登录后评论');
    try {
      setSubmitting(true);
      const { rows, count } =  await createCommentI({ articleId: articleId, content: value, userId: user.userId });
      setValue('');
      setCommentList(rows);
    } finally {
      setSubmitting(false);
    }

  }

  return (
    <div id="discuss">
      <div className="discuss-header">
        <span className="discuss-count">{calcCommentsCount(commentList)}</span>
        {articleId !== -1 ? '条评论' : '条留言'}
        <span className="discuss-user">
          <Dropdown overlay={renderDropdownMenu()} trigger={['click', 'hover']}>
            <span>
              {username || '未登录用户'} <MyIcon type="icon-down" />
            </span>
          </Dropdown>
        </span>
        <Divider className="hr" />
      </div>
      <Comment
        avatar={
          username ? (<AppAvatar userInfo={user} />) : (<MyIcon type="icon->github" styles={{fontSize: 40, margin: '5px 5px 0 0'}} />)
        }
        content={
          <Editor
            onChange={ e => setValue(e.target.value)}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
            articleId={articleId}
          />
        }
       />

       <CommentList commentList={commentList} articleId={articleId} userInfo={user} setCommentList={setCommentList} />
    </div>
  )
}

export default Discuss;
