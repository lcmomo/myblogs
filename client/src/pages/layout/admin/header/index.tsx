import MyIcon from "@/pages/components/my_icon";
import { logout, selectorUser } from "@/store/slice/user";
import Dropdown from "antd/lib/dropdown/dropdown";
import Menu from "antd/lib/menu";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const MenuItem = Menu.Item;
function AdminHeader() {

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectorUser);
  const menu = (
    <Menu className="menu">
      <MenuItem key="toHome">
        <span onClick={e => history.push('/')}>返回主页</span>
      </MenuItem>
      <MenuItem key="logout">
        <span onClick={e => {
            dispatch(logout());
            history.push('/');
          }}>
            退出登录
        </span>
      </MenuItem>
    </Menu>
  )
  return (
    <>
    <div>
      <span className="header-title">后台管理</span>
      <Dropdown overlay={menu} className='header-dropdown'>
          <a className='ant-dropdown-link'>
            {user.username} <MyIcon type='icon-down' />
          </a>
        </Dropdown>
    </div>
    </>
  )
}

export default AdminHeader;