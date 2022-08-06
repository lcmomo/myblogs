
import Button from 'antd/lib/button/button';
import Result, { ResultStatusType } from 'antd/lib/result';
import React, { FC, ReactNode } from 'react';
import { useHistory } from 'react-router';


export interface ResultProps {
  status?: ResultStatusType,
  title?: string,
  subTitle?: string,
  extraText?: ReactNode
}
const MyResult: FC<ResultProps> = ({status = '403', title = '403', subTitle = '', extraText='返回首页'}) => {
  const history = useHistory();

  function toHome() {
    history.push('/');
  }

  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={<Button type="primary" onClick={toHome} >{extraText}</Button>}
    />
  );
}

export default MyResult;