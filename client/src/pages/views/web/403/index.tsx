import React, { FC } from "react";
import MyResult from "@/pages/components/result";
import { ResultStatusType } from "antd/lib/result";


const Forbidden: FC<{}> = () => {

  const forbiddenTip = {
    status: 403 as ResultStatusType,
    title: '403',
    subTitle: '您没有权限访问该页面，请联系博主开通访问权限！'

  }

  return (
    <MyResult {...forbiddenTip} />
  )

}

export default Forbidden;