import { LoginInfo, RegisterInfo, UserInfo } from '../store/slice/user';
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

export const updateAvatar = async (user: UserInfo): Promise<any> => {

 const res = await request('/user/update-avatar', {
    method: 'PUT',
    body: {
      ...user
    }
  }, { showMessage: true });
  return res;
}
