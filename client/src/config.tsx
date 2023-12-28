import React from "react";
import MyIcon from "./pages/components/my_icon";
import BlogAvatar from '@/assets/img/blog_avatar.jpg';
import Href from '@/pages/components/href';
import MyInfo from "@/pages/views/web/about/my_info";
import { API_PATH } from "./utils/config";
interface HomePageItem {
  link: string,
  icon: any
}

interface HomePage {
  github: HomePageItem
}

interface SideBarProps {
  avatar: string;
  title: string;
  subTitle: string;
  homepages: HomePage
}
// import AvatarImg from '@/assets/img/logo.png';
export const HEADER_BLOG_NAME = '夙兮执梦';


// API_BASE_URL
export const API_BASE_URL = process.env.NODE_ENV === 'development' ? `http://localhost:3002${API_PATH}` : `http://localhost:3002${API_PATH}`;

const AVATAR_IMG = ''

// === sidebar
export const SIDEBAR: SideBarProps = {
  avatar: BlogAvatar, // 侧边栏头像
  title: '夙兮', // 标题
  subTitle: '搬砖工', // 子标题
  homepages: {
    github: {
      link: 'https://github.com/lcmomo',
      icon: <MyIcon type='icon-github-fill' className='homepage-icon' />
    }
  }
  }

// === discuss avatar
export const DISCUSS_AVATAR = SIDEBAR.avatar; // 评论框我的头像

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
  renderMyInfo: <MyInfo />
}

// 公告 announcement
export const ANNOUNCEMENT = {
  enable: false, // 是否开启
  content: (
    <>
      个人笔记网站，请访问
      <Href href=''> my note</Href>
    </>
  )
}

export const PUB_KEY = 'abcd1234abcd1234';

export const USER_ROLES = {
  ADMIN: 1,
  USER: 2
};
