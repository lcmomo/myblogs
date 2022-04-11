import React, { FC } from 'react';
type MyIconProps = {
  type: string,
  styles?: any,
  className?: string,
  onClick?: (e: any) => void
}
const MyIcon: FC<MyIconProps> = (props) => {

  const { type, styles } = props;
  return (
  <span className={`icon iconfont ${type}`} style={styles} />
  )
};

export default  MyIcon;
