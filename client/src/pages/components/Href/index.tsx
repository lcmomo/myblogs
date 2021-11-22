import React from 'react';
import { isExternal } from '../../../utils';

function Href(props: any) {
  const { href, children, ...rest } = props;
  let url = href;
  if (!isExternal(href)) {
    url = `http://${href}`;
  }
  return (
  <a target="_blank" rel="noreferrer" {...rest} href={url}>{children}</a>
  );
}

export default Href;
