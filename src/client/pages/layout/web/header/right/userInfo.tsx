import React from 'react';
import { withRouter } from 'react-router-dom';

import { Button, Dropdown, Menu } from 'antd';

import { Avatar, Popover, Typography } from 'antd';
import MyAvatar from '@/pages/components/my_avatar';
// import { DISCUSS_AVATAR } from '@/config';

// import { userInfoProp } from '@/type';

const { Text } = Typography;
// interface userInfoProp  {
//   username: string,
//   github?: any,
//   role: number,
// }
function UserInfo(props: any) {
  // const dispatch = useDispatch()
  // const bus = useBus()
  // const userInfo = useSelector(state => state.user)
  const userInfo = {
    username: '2',
    github: '',
    role: 1
  }
  const { username, github, role } = userInfo;

  const MenuOverLay = (
    <Menu>
      {role === 1 && (
        <Menu.Item>
          <span onClick={e => console.log("导入文章")}>导入文章</span>
        </Menu.Item>
      )}
      {role === 1 && (
        <Menu.Item>
          <span onClick={e => props.history.push('/admin')}>后台管理</span>
        </Menu.Item>
      )}
      <Menu.Item>
        <span className='user-logout' onClick={e => console.log('logout')}>
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
              onClick={e => console.log("login")}>
              登录
            </Button>
            <Button ghost danger size='small' onClick={e => console.log('register')}>
              注册
            </Button>
          </>
        )}
    </div>
  )
}

export default withRouter(UserInfo);
