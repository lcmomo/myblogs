import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../index';

interface ArticleInfo {
}
interface TagInfo {
  name: string;
  count: number,
  color?: string
}
interface ArticleState {
  articleList: Array<ArticleInfo>,
  tagList: Array<TagInfo>

}


const initState: ArticleState = {
  articleList: [],
  tagList: [{
    "name": "测试",
    "count": 1
}],

}

export const articleSlice = createSlice({
  name: 'article',
  initialState: initState,
  reducers: {
    setArticleList: (state: ArticleState, action: PayloadAction<ArticleInfo[]>) => {
      state.articleList = action.payload;
    },
    setTagList: (state: ArticleState, action: PayloadAction<TagInfo[]>) => {
      state.tagList = action.payload;
    }
  }
});

export const {
 setArticleList,
 setTagList,
} = articleSlice.actions;

export const selectorArticles = (state: RootState) => state.article.articleList;
export const selectorTags = (state: RootState) => state.article.tagList;
export default articleSlice.reducer;
