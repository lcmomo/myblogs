import { CommentInfo } from "@/store/slice/comment";
import request from "@/utils/request";

export const createCommentI = async (comment: CommentInfo): Promise<any> =>  {
  const res = await request('/comment', {
    method: 'POST',
    body: {
      ...comment
    }
  }, {showMessage: true});
  return res;
}

export const deleteCommentI = async (commentId: number): Promise<any> => {
  const res = await request(`/comment/${commentId}`, {
    method: 'DELETE',
  }, { showMessage: true});
  return res;
}