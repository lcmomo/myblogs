// import AvatarImg from '@/assets/img/logo.png';
export const HEADER_BLOG_NAME: String = '夙兮执梦';


// console.log(AvatarImg)


// API_BASE_URL
export const API_BASE_URL = 'http://localhost:6060';


// === sidebar
export const SIDEBAR = {
  avatar: '', // 侧边栏头像
  title: '夙兮', // 标题
  subTitle: '学而知不足', // 子标题
  }

// === discuss avatar
export const DISCUSS_AVATAR = SIDEBAR.avatar // 评论框博主头像

/**
 * github config
 */
export const GITHUB = {
  enable: true, // github 第三方授权开关
  client_id: 'c6a96a84105bb0be1fe5', // Setting > Developer setting > OAuth applications => client_id
  url: 'https://github.com/login/oauth/authorize' // 跳转的登录的地址
}

export const ABOUT = {
  avatar: SIDEBAR.avatar,
  describe: SIDEBAR.subTitle,
  discuss: true, // 关于页面是否开启讨论
}
