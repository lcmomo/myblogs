import React, { CSSProperties } from 'react';

type SvgIconProps = {
  className?: string;
  type: string;
  style?: CSSProperties | undefined;
}

// iconfont svg
const SvgIcon = (props: SvgIconProps) => {
  return (
    <svg className={`svg-icon ${props.className}`} aria-hidden='true' style={props.style}>
      <use xlinkHref={`#${props.type}`} />
    </svg>
  )
}

export default SvgIcon
