import request from "@/utils/request";

export const deleteReplyI = async (replyId: number): Promise<any> => {
  const res = await request(`/reply/${replyId}`, {
    method: 'DELETE',
  }, { showMessage: true});
  return res;
}