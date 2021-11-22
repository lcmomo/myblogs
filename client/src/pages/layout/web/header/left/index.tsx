import React, { FC } from 'react';

import { HEADER_BLOG_NAME } from '../../../../../config';
import MyIcon from '../../../../components/Icon';


const HeaderLeft: FC = (props) => {
  return (
    <div className="header-left">
      <MyIcon type="icon-CI" />
      <span className='blog-name'>{ HEADER_BLOG_NAME }</span>
    </div>
  )
}

export default HeaderLeft;
