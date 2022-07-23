import Href from "@/pages/components/href";
import MyIcon from "@/pages/components/my_icon";
import Divider from "antd/lib/divider";
import Rate from "antd/lib/rate";
import React, { FC } from "react";

const skills = [
  {
    label: '前端搬砖工',
    rate: 3
  },
  {
    label: 'React,Vue',
    rate: 3
  },
  {
    label: 'Webpack',
    rate: 2
  }
];

type MyInfoProps = {}
const MyInfo: FC<MyInfoProps> = () => {
  
  return (
    <>
      <Divider orientation="left">博客说明</Divider>
        <p>技术栈：react hooks + typescript + antd + nestjs + mysql </p>
        <p>源码:<Href href="https://github.com/lcmomo/myblogs">github</Href>,
          仅做学习交流，不做他用!
        </p>
      <Divider>关于我</Divider>
      <ul className="about-list">
        <li>姓名：夙兮执梦</li>
        <li>学历： 本科 计算机科学与技术</li>
        <li>联系：
          <MyIcon type="icon-email" styles={{ marginRight: 5, transform: 'translateY(2px)' }} />
          <a href="mailto: 2485426408@qq.com">2485426408@qq.com</a>
        </li>
        <li>位置：陕西西安</li>
        <li>
          技能
          <ul>
            {skills.map((item, i) => (
              <li key={i}>
                {item.label}
                <Rate defaultValue={item.rate} disabled />
              </li>
            ))}
          </ul>
        </li>
        </ul>
    </>
  )
}

export default MyInfo;