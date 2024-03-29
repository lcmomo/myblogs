import React from 'react';
import '../my_avatar/style.less';
import { Avatar, Popover, Typography } from 'antd';
import Href from '../href';

import { API_BASE_URL, DISCUSS_AVATAR } from '../../../config';
import MyIcon from '../my_icon';
const { Text, Title } = Typography;

function AvatarComponent(props: any) {
  const { github, username, role, avatar } = props;
  let avatarSrc = '';
  if (github && github.avatar_url) avatarSrc = github.avatar_url;
  if (avatar) {
    const baseDownloadAvatar = `${API_BASE_URL}/common/download`;
    avatarSrc = `${baseDownloadAvatar}/${avatar}`;
  }
  if (role === 1) avatarSrc = DISCUSS_AVATAR;
  return <Avatar src={avatarSrc}>{username}</Avatar>;
}

function AppAvatar(props: any) {
  const { role, username, github, avatar } = props.userInfo;
  if (github && props.popoverVisible) {
    return (
      <Popover
        arrowPointAtCenter
        overlayClassName='avatar-popover'
        trigger='hover'
        // placement='right'
        placement='topLeft'
        title={
          github.bio ? (
            <>
              <MyIcon type='github' className='mr10' />
              {github.bio}
            </>
          ) : null
        }
        content={
          <div className='popover-content'>
            <Href href={github.html_url} className='popover-cotent-avatar'>
              <AvatarComponent role={role} github={github} username={username} />
            </Href>
            <ul className='github-info'>
              <li>
                {github.name ? (
                  <>
                    <span className='github-name'> {github.name}</span>
                    <Text type='secondary'>{github.login}</Text>
                  </>
                ) : (
                  <span className='github-name'> {github.login}</span>
                )}
              </li>

              {github.blog && (
                <li>
                  <Href href={github.blog}>
                    <MyIcon type='iconblog2' className='mr10' />
                    <span>{github.blog}</span>
                  </Href>
                </li>
              )}

              {github.location && (
                <li>
                  <MyIcon type='iconlocation' className='mr10' />
                  {github.location}
                </li>
              )}
            </ul>
          </div>
        }>
        <AvatarComponent role={role} github={github} username={username} avatar={avatar} />
        <span />
      </Popover>
    )
  } else {
    return <AvatarComponent role={role} github={github} username={username} avatar={avatar} />
  }
}

export default AppAvatar;
