export type INavListProperty = {
  title: string,
  link: string,
  icon?: string
}

export const  navList: INavListProperty[]  = [
  {
    icon: 'icon-home',
    title: '首页',
    link: '/web/home'
  },
  // {
  //   icon: 'edit',
  //   title: '归档',
  //   link: '/archives'
  // },
  // {
  //   icon: 'folder',
  //   title: '分类',
  //   link: '/categories'
  // },
  {
    icon: 'icon-user',
    title: '留言',
    link: '/web/about'
  }
]
