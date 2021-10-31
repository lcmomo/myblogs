import React, { FC } from 'react';
type MyIconProps = {
  type: string,
  style?: any,
  className?: string,
  onClick?: (e: any) => void
}
const MyIcon: FC<MyIconProps> = (props) => {

  const { type, style } = props;
  return (
  <span className={`icon iconfont ${type}`} style={style} />
  )
};

export default  MyIcon;
