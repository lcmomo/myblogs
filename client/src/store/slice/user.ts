import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../index';
import { loginI, registerI } from '@/services/user';
import { save, get, remove } from '@/utils/storage';
import { decodeToken } from '@/utils/token';

export interface UserInfo {
  username: string;
  role: number;
  userId: number;
  github?: any,
  avatar?: string
}
interface UserState {
  userInfo: UserInfo

}

export type LoginInfo = {
  account: string;
  password: string;
}

export type RegisterInfo = {
  username: string;
  password: string;
  email: string;
}

const userInfo = decodeToken(get('token')) as UserInfo;
const defaultUserInfo = {
  username: '',
  role: 2,
  userId: 0,
  github: ''
}
const initState: UserState = {
  userInfo:  userInfo || defaultUserInfo

}

export const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    setUserInfo: (state: UserState, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    }
  }
});

export const {
 setUserInfo
} = userSlice.actions;


export const login = (loginInfo: LoginInfo) => async (dispatch: AppDispatch) => {

  try {
    const data = await loginI(loginInfo);
    if (data) {
      save('token', data.token);
      dispatch(setUserInfo( {  ...data , ...decodeToken(data.token) } as UserInfo));
    }
  } catch(err) {
    throw err;
  }
};

export const logout = () => (dispatch: AppDispatch) => {
  remove('token');
  dispatch(setUserInfo({ username: '', userId: 0, role: 2, github: null }))
}

export const register = (registerInfo: RegisterInfo) => async (dispatch: AppDispatch) => {
  try {
    const data = await registerI(registerInfo);
    if (data) {
      save('token', data.token);
      dispatch(setUserInfo(decodeToken(data.token) as UserInfo));
    }
  } finally {

  }
}

export const selectorUser = (state: RootState) => state.user.userInfo;

export default userSlice.reducer;
