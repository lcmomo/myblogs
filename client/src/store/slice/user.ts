import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../index';
import { loginI } from '@/services/user';

interface UserInfo {
  username: string;
  role: number;
  userId: number;
  github?: any
}
interface UserState {
  userInfo: UserInfo
  
}

export type LoginInfo = {
  account: string;
  password: string;
}

const initState: UserState = {
  userInfo: {
    username: '',
    role: 2,
    userId: 0,
    github: null
  }

}

export const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    setUserInfo: (state: UserState, action: PayloadAction<UserInfo>) => {
      console.log('enter setUser')
      state.userInfo = action.payload;
    }
  }
});

export const {
 setUserInfo
} = userSlice.actions;


export const login = (loginInfo: LoginInfo) => async (dispatch: AppDispatch) => {
  const res = await loginI(loginInfo);
  console.log("resU: ", res.data)
  dispatch(setUserInfo(res.data));
};

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
