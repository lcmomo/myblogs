import { LoginInfo } from '../store/slice/user';
import request from '@/utils/request';
export const loginI = async (loginInfo: LoginInfo): Promise<any> => {

  const res = await request('/user/login', {
    method: 'POST',
    body: {
      ...loginInfo
    }
  });
  return res.data;
}