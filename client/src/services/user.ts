import { LoginInfo, RegisterInfo } from '../store/slice/user';
import request from '@/utils/request';

export const loginI = async (loginInfo: LoginInfo): Promise<any> => {

  const res = await request('/user/login', {
    method: 'POST',
    body: {
      ...loginInfo
    }
  }, { showMessage: true });
  return res;
}

export const registerI = async (registerInfo: RegisterInfo): Promise<any> =>  {
  const res = await request('/user/register', {
    method: 'POST',
    body: {
      ...registerInfo
    }
  }, {showMessage: true});
  return res;
}