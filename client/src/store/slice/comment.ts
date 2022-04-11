import { createCommentI } from '@/services/comment';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../index';

export interface CommentInfo {
}

export interface ReplyInfo {
  
}
interface CommentState {
  commentList: Array<CommentInfo>

}

const initState: CommentState = {
  commentList: []
}

export const createComment = (comment: CommentInfo)  => async (dispatch: AppDispatch) => {
  try {
    const data = await createCommentI(comment);
    if (data) {
      dispatch(setCommentList(data));
    }
  } finally {

  }
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState: initState,
  reducers: {
    setCommentList: (state: CommentState, action: PayloadAction<CommentInfo[]>) => {
      state.commentList = action.payload;
    },
  }
});

export const {
  setCommentList,
} = commentSlice.actions;

export const selectorComment = (state: RootState) => state.comment.commentList;

export default commentSlice.reducer;
