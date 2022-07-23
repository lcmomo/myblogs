import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { navList } from '../nav_list';
import MyIcon from '@/pages/components/my_icon';
const NavBar = (props: any) => {
  const location = useLocation();
  const { mode = 'horizontal' } = props;
  return (
    <Menu mode={mode} selectedKeys={[location.pathname]} className='header-nav'>
      {navList.map(nav => (
        <Menu.Item key={nav.link}>
          <NavLink to={nav.link}>
            {nav.icon && <MyIcon type={nav.icon} />}
            <span className='nav-text'>{nav.title}</span>
          </NavLink>
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default NavBar;