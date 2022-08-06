import React, { FC } from "react";
import MyResult from "@/pages/components/result";
import { ResultStatusType } from "antd/lib/result";


const NotFound: FC<{}> = () => {

  const forbiddenTip = {
    status: 404 as ResultStatusType,
    title: '404',
    subTitle: '页面未找到'

  }

  return (
    <MyResult {...forbiddenTip} />
  )

}

export default NotFound;