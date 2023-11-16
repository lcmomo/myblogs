import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Dropdown, Menu, Typography } from 'antd';

import MyAvatar from '@/pages/components/my_avatar';
import useBus from '@/hooks/usebus';
import SignModal from '@/pages/components/signmodal';
import { logout, setUserInfo } from '@/store/slice/user';
import { RootState } from '@/store';
import { USER_ROLES } from '@/config';
import MyUpload from '@/pages/components/upload';


const { Text } = Typography;
// interface userInfoProp  {
//   username: string,
//   github?: any,
//   role: number,
// }
function UserInfo(props: any) {
  const dispatch = useDispatch();
  const bus = useBus();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const { username, github, role, userId } = userInfo;

  const loginCall = useCallback(
    () => {
      bus.emit('openSignModal', 'login');
    }, [],
  );

  const registerCall = useCallback(
    () => {
      bus.emit('openSignModal', 'register');
    },
    [],
  );

  const logoutCall = useCallback(() => {
    dispatch(logout());
    props.history.push('/');
  }, []);

  const updateAvatar = useCallback(
    (newUser) => {
     dispatch(setUserInfo({...userInfo, avatar: newUser.avatar}))
    },
    []
  )

  const MenuOverLay = (
    <Menu>
      {role === USER_ROLES.ADMIN && (
        <Menu.Item key="uploadArticle">
          <span onClick={e => console.log("导入文章")}>导入文章</span>
        </Menu.Item>
      )}
      {role === USER_ROLES.ADMIN && (
        <Menu.Item key="manage">
          <span onClick={e => props.history.push('/admin')}>后台管理</span>
        </Menu.Item>
      )}
      {
        username && (
          <Menu.Item key="uploadAvatar">
          <MyUpload userInfo={userInfo} updateAvatar={updateAvatar} buttonText="编辑头像" />
        </Menu.Item>
        )
      }
      <Menu.Item key="webLogout">
        <span className='user-logout' onClick={logoutCall}>
          退出登录
        </span>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className='header-userInfo'>
      {username ? (
        <Dropdown placement='bottomCenter' overlay={MenuOverLay} trigger={['click', 'hover']}>
          <div style={{ height: 55 }}>
            <MyAvatar userInfo={userInfo} popoverVisible={false} />
          </div>
        </Dropdown>
      )
        : (
          <>
            <Button
              ghost
              type='primary'
              size='small'
              style={{ marginRight: 20 }}
              onClick={ loginCall}>
              登录
            </Button>
            <Button ghost danger size='small' onClick={registerCall}>
              注册
            </Button>
          </>
        )}
        <SignModal />
    </div>
  )
}

export default withRouter(UserInfo);
