import request from "@/utils/request";
import React, { FC, useEffect, useState } from "react";
import useMediaQuery from "react-responsive";
import { SIDEBAR, ABOUT } from '@/config';
import Avatar from "antd/lib/avatar/avatar";
import Discuss from "@/pages/components/discuss";
type AboutProps = {}
const About: FC<AboutProps> = () => {

  const [ commentList, setCommentList ] = useState([]);
  const iPhoneScreen = useMediaQuery({query: '(max-width: 576px)'});

  useEffect(() => {
    const fetchList = async () => {
      const article = await request('/article/-1');
      setCommentList(article.comments);
    }
    ABOUT.discuss && fetchList();
  }, []);

  return (
    <div className="app-about" style={{ paddingRight: iPhoneScreen ? 0 : 20 }}>
      <Avatar src={SIDEBAR.avatar} />
      <span style={{paddingLeft: 10}}>{ABOUT.describe}</span>
      { ABOUT.renderMyInfo}
      { ABOUT.discuss && <Discuss articleId={-1} commentList={commentList} setCommentList={setCommentList} />}
    </div>
  )
}

export default About;