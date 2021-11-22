import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { navList } from '../navList';
import MyIcon from '@/pages/components/Icon';
const NavBar = (props: any) => {
  const location = useLocation();
  const {mode = 'horizontal'} = props;
  return (
    <Menu mode={mode} selectedKeys={[location.pathname]} className='header-nav'>
      {navList.map(nav => (
        <Menu.Item key={nav.link}>
          <Link to={nav.link}>
            {nav.icon && <MyIcon type={nav.icon} />}
            <span className='nav-text'>{nav.title}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default NavBar;