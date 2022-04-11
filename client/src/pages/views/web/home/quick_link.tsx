import Divider from "antd/lib/divider";
import React, { useState } from "react";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const title = '文章导航';
type ListProps = { 
  list: Array<any>
}
const List: FC<ListProps> = (props: any) => {
  const { list, showTitle = true} = props;
  return (
    <ul className="preview">
      {showTitle  && <Divider>{title}</Divider>}
      {list.map((item: { id: string | number; title: React.ReactNode; }) => (
        <li key={item.id}>
          <Link to={`/article/${item.id}`}>{item.title}</Link>
        </li>
      ))}
    </ul>)
};

type QuickLinkProps = {
  list: Array<ListProps>
}
const QuickLink:FC<QuickLinkProps> = (props: any) => {
  const isGreaterThan1300 = useMediaQuery({query: '(min-width: 1300px)'});
  const { list } = props;
  const [drawerVisible, setDrawerVisible] = useState(false);

  // return isGreaterThan1300 ? <List list={list} /> : (

  // )
  return <List list={list} />
}

export default QuickLink;
