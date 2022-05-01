export interface ArticleListQueryParams {
  page?: number,
  pageSize?: number,
  preview?: number,
  keyword?: string,
  tag?: string,
  order?: string,
  id?: number,
  type?: number,
  title?: string,
}

export interface ArticleAddBody {
  content: string,
  authorId: number,
  title: string,
  articleId?: number,
  tags?: Array<Record<string, unknown>>,
}