import request from "@/utils/request";

export const uploadI = async (file: any): Promise<any> => {

  if (!file) return;
  let formData = new FormData();
    formData.append('file', file);
  const {  uuid } = await request(`/common/upload`, {
    method: 'POST',
    body: formData
  }, { showMessage: true});
 
  if (!uuid) return;
  return uuid;

  // return await downloadI(uuid);
}

export const downloadI = async (uuid: string): Promise<any> => {
console.log("dw： ", uuid)
  if (!uuid) return;
  const res = await request(`/common/download/${uuid}`, {
    method: 'GET'
  }, { showMessage: true});

  return res;
}