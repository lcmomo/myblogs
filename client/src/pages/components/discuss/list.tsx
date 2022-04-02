import React, { FC, useEffect, useState } from "react";
// import Comment from 'antd/lib/comment';
import { Button, message, Popconfirm, Tooltip, Comment } from "antd";
import request from "@/utils/request";
import MyIcon from "../my_icon";
import AppAvatar from "../my_avatar";
import { translateMarkdown } from "@/utils/markdown";
import dayjs from "@/utils/dayjs";
import TextArea from "antd/lib/input/TextArea";
import { useSelector } from "react-redux";
import { selectorUser, UserInfo } from "@/store/slice/user";
import { deleteReplyI } from "@/services/reply";
import { deleteCommentI } from "@/services/comment";
import { CommentInfo, ReplyInfo } from "@/store/slice/comment";

type CommentItemProps = {
  
  id: number,
  item: any,
  userInfo: UserInfo,
  articleId: number,
  commentId: number,
  replyVisible: boolean,
  onReply: ({} : { replyId: number, commentId: number}) => void,
  setCommentList: ( commentList: Array<CommentItemProps>) => void,
  commentList: Array<CommentItemProps>,
  replies?: Array<ReplyInfo>,
  children?: any,
  replyId?: number,
}

type CommentListProps = {
  commentList: Array<CommentItemProps>,
  articleId: number,
  userInfo: UserInfo,
  setCommentList: ( commentList: Array<CommentItemProps>) => void,
}

function CommentItem(props: CommentItemProps) {
  const { children,
    item,
    userInfo,
    articleId,
    commentId,
    replyId,
    replyVisible,
    commentList,
    setCommentList,
    onReply
  } = props;
  const { user } = item;
  const [value, setValue] = useState('');
  useEffect(() => {
    replyVisible && setValue('');
  }, [replyVisible]);

  function handleChange(e: { target: { value: React.SetStateAction<string>; }; }) {
    setValue(e.target.value);
  }
  function handleKeyUp(e: { ctrlKey: any; keyCode: number; }) {
    if (e.ctrlKey && e.keyCode === 13) {
      onSubmit();
    }
  }
  async function onSubmit() {
    if (!userInfo.userId) return message.warn('您还未登录，请登录后评论');
    const res = await request('/comment', { method: 'POST', body: { userId: userInfo.userId,
      articleId,
      content: value.trim(),
      commentId }});
     onReply({commentId: 0, replyId: 0});
     setCommentList(res.rows)
  }

  function handleReply() {
    onReply({commentId, replyId});
  }

  async function  handleDelete() {
    if (replyId) {
      await deleteReplyI(replyId);
      const beforeCommentList = [...commentList];
      const targetComment: CommentItemProps = beforeCommentList.find((comment: CommentItemProps) => comment.id === commentId);
      targetComment.replies = targetComment.replies.filter((r: any) => r.id !== replyId);
      setCommentList(beforeCommentList);
    } else {
      await deleteCommentI(commentId);
      let beforeCommentList: Array<CommentItemProps> = [...commentList];
      beforeCommentList = beforeCommentList.filter((c: CommentItemProps) => c.id !== commentId);
      setCommentList(beforeCommentList);
    }
  }

  return (
    <Comment
      actions={[
        <span onClick={handleReply}>回复</span>,
        <>
        {
          userInfo.role === 1 && (
            <Popconfirm
              title={"是否删除留言?"}
              cancelText="取消"
              okText="确认"
              onConfirm={handleDelete}
            >
              {' '}<MyIcon type="icon-delete" className="icon-delete">1</MyIcon>
            </Popconfirm>
          )
        }
        </>
      ]}
      author={<span>{user && user.username}</span>}
      avatar={<AppAvatar userInfo={user} />}
      content={
        <div className="article-detail" dangerouslySetInnerHTML={{ __html: translateMarkdown(item.content) }}></div>
      }
      datetime={
      <Tooltip title={item.createdAt}>
        <span>{ dayjs(item.createdAt).fromNow()}</span>
      </Tooltip>}
    >
      {replyVisible && (
        <div className="reply-form">
          <TextArea
            placeholder={`回复${item.user.username}...`}
            value={value}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
            <div className='reply-form-controls'>
            <span className='tip'>Ctrl or ⌘ + Enter</span>
            <Button htmlType='submit' type='primary' disabled={!value.trim()} onClick={onSubmit}>
              回复
            </Button>
          </div>
        </div>
      )}
      {children}
    </Comment>
  );
}

const CommentList: FC<CommentListProps> = ({commentList, articleId, userInfo, setCommentList}) => {
  const user = useSelector(selectorUser);
  const [replyTarget, setReplyTarget] = useState({commentId: 0, replyId: 0});
  return (
    <div className="discuss-list">
      {commentList.map((comment: CommentItemProps) => (
        <CommentItem
          item={comment}
          key={comment.id}
          id={comment.id}
          articleId={articleId}
          userInfo={userInfo}
          commentId={comment.id}
          setCommentList={setCommentList}
          commentList={commentList}
          onReply={setReplyTarget}
          replyVisible={replyTarget.commentId === comment.id && !replyTarget.replyId}
        >
           {comment.replies.map((reply: any) => (
            <CommentItem
              item={reply}
              key={reply.id}
              id={reply.id}
              articleId={articleId}
              userInfo={userInfo}
              commentId={comment.id}
              replyId={reply.id}
              setCommentList={setCommentList}
              commentList={commentList}
              onReply={setReplyTarget}
              replyVisible={replyTarget.commentId === comment.id && replyTarget.replyId === reply.id}
            />
          ))}
        </CommentItem>
      )
      )}
    </div>
  )
}

export default CommentList;