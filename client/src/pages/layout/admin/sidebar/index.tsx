import MyIcon from "@/pages/components/my_icon";
import Menu from "antd/lib/menu";
import MenuItem from "antd/lib/menu/MenuItem";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import menu, { MenuItemProps } from "./menu";

type AdminSidebarProps = {
  selectedKeys: Array<string>
 }

function getMenuOpenKeys(menu: Array<MenuItemProps>) {
  const list: Array<{pathname: string, openKey: string}> = [];
  menu.forEach(item => {
    if(item.children) {
      item.children.forEach(child => {
        list.push({
          pathname: child.path,
          openKey: item.path
        });
      });
    }
  });
  return list;
}
const menuMenuOpenKeys = getMenuOpenKeys(menu);

const AdminSidebar: FC<AdminSidebarProps> = (props) => {
  
  function renderMenu(list: Array<MenuItemProps>) {
    const renderRoute = ((item: MenuItemProps) => {
      if (item.hidden) return null;
      if (item.children) {
        return (
          <SubMenu
            key={item.path}
            title={
              <span> {item.icon && <MyIcon type={item.icon} />} <span>{item.name}</span></span>
            }
          >
            {item.children.map((child: MenuItemProps) => renderRoute(child))}
          </SubMenu>
        )
      } else {
        return (
          item.name && (
            <MenuItem key={item.path}>
              <NavLink to={item.path}>
                {item.icon && <MyIcon type={item.icon} />}
                <span>{item.name}</span>
              </NavLink>
            </MenuItem>
          )
        )
      }
    });
    return list.map((item) => renderRoute(item));
  }
  const target = menuMenuOpenKeys.find(d => d.pathname === props.selectedKeys[0])
  const openKeys = target ? [target.openKey] : []
  return (
    <Menu
      defaultOpenKeys={openKeys}
      // defaultSelectedKeys={props.selectedKeys}
      selectedKeys={props.selectedKeys}
      mode='inline'
      theme="dark"
      style={{ height: '100%', borderRight: 0 }}>
      {renderMenu(menu)}
    </Menu>
  )
}
export default AdminSidebar;