import { Anchor } from 'antd';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

const { Link } = Anchor;

type AnchorItem = { 
  tag: string, // 标签类型
  title: string, //
  href: string, //
  children?: Array<AnchorItem>
}
type renderLinkProp = { 
  href: string,
  title: string, 
  children: Array<renderLinkProp>
}
// 根据article 内容生成锚点
function getAnchorList(str: string, pathname: string) {
  const pattern = /<(h[1-6])[\s\S]+?(?=<\/\1>)/g;

  const list: any[] = [];

  function pushItem(arr: any, item: any) {
    const len = arr.length;
    const matchItem = arr[len - 1];

    if (matchItem && matchItem.tag !== item.tag) {
      pushItem(matchItem.children, item);
    } else {
      arr.push(item);
    }
  }
  str.replace(pattern, ($0?: string, $1?: string): any => {
    console.log('reg: ', $0)
    const title = $0.replace(/.*?>/, '');
    const startIndex = $0.indexOf('>');
    const endIndex = $0.indexOf('>');
    const href = `#${pathname}#${title}`;
    const currentItem: AnchorItem = {
      tag: $1, // 标签类型
      title,
      href,
      children: []
    }
    pushItem(list, currentItem);
  });
  return list;
}

const Navigation: FC<{content: string}> = ({content}) => {
  
  const location = useLocation();
  const { pathname } = location;
  const list = getAnchorList(content, pathname);

  function renderLink({href, title, children}: renderLinkProp) {
    return (
      <Link key={href} href={href} title={title}>
        {children.length > 0 && children.map(child => renderLink(child))}
      </Link>
    )
  }
  return <Anchor affix={false} >{list.map(renderLink)}</Anchor>;
}

export default Navigation;