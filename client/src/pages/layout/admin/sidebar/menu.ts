export type MenuItemProps = {
  path: string,
  icon?: string,
  name: string,
  children?: Array<MenuItemProps>,
  hidden?: boolean,
}

const menu: Array<MenuItemProps> = [
  {
    path: '/admin',
    icon: 'home',
    name: '首页'
  },
  {
    path: '/admin/article',
    icon: 'switcher',
    name: '文章',
    children: [
      {
        path: '/admin/article/list',
        icon: 'folder',
        name: '列表'
      },
      {
        path: '/admin/article/add',
        icon: 'edit',
        name: '编辑'
      }
    ]
  },
  {
    path: '/admin/user',
    icon: 'user',
    name: '用户管理'
  }
]

export default menu
