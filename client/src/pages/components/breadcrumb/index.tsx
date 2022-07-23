import { useListener } from "@/hooks/usebus";
import Breadcrumb from "antd/lib/breadcrumb/Breadcrumb";
import React, { useState, MouseEvent } from "react";
import { Link, useHistory } from "react-router-dom";

type breadcrumbListProps = {
  link: string,
  name: string,
  goBack?: boolean,
}

const BreadcrumbItem = Breadcrumb.Item;
function BlogBreadcrumb() {
  const history = useHistory();
  const [list, setList] = useState([]);
  const breadcrumbList: Array<breadcrumbListProps> = list.length > 0 ? [{ link: '/admin', name: '首页'}].concat(list) : [];
console.log("bread", breadcrumbList)
  useListener('breadcrumbList', (list: Array<breadcrumbListProps>) => {
    console.log("list: ", list)
    setList(list)
  });

  function handleClick(e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, goBack = false) {
    if (goBack) {
      e.preventDefault();
      history.go(-1);
    }
    console.log("history", history)
  }
  return (
    <Breadcrumb className="breadcrumb">
      {
        breadcrumbList.map((item, index) => (
          <BreadcrumbItem key={index}>
            {
              typeof item === 'string' ? item :
            <Link to={item.link || '/'} onClick={handleClick}>{item.name}</Link>
            }
          </BreadcrumbItem>
        ))
      }
    </Breadcrumb>
  )
}

export default BlogBreadcrumb;