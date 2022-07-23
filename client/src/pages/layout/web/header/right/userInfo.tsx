import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Dropdown, Menu } from 'antd';

import { Avatar, Popover, Typography } from 'antd';
import MyAvatar from '@/pages/components/my_avatar';
import useBus from '@/hooks/usebus';
import SignModal from '@/pages/components/signmodal';
import { logout } from '@/store/slice/user';
import { RootState } from '@/store';
// import { DISCUSS_AVATAR } from '@/config';

// import { userInfoProp } from '@/type';

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

  // const userInfo = {
  //   username: '',
  //   github: '',
  //   role: 2
  // }
  const { username, github, role } = userInfo;

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
  }, [])

  const MenuOverLay = (
    <Menu>
      {role === 1 && (
        <Menu.Item key="uploadArticle">
          <span onClick={e => console.log("导入文章")}>导入文章</span>
        </Menu.Item>
      )}
      {role === 1 && (
        <Menu.Item key="manage">
          <span onClick={e => props.history.push('/admin')}>后台管理</span>
        </Menu.Item>
      )}
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
