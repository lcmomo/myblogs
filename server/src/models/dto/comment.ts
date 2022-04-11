export interface CommentDto {
  articleId: number;
  userId: number;
  content: string;
  commentId?: number;
}