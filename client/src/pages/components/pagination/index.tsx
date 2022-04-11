import Pagination from 'antd/lib/pagination/Pagination';
import React, { FC } from 'react';
import { useMediaQuery } from 'react-responsive';


type PaginationProps = { 
  total: number,
  current: number,
  onChange: (page: number, pageSize: number) => void,
  pageSize: number,
  styles?: any
}
const WebPagination: FC<PaginationProps> = ({total, current, onChange, pageSize = 10, styles={}}) => {
  const isLessThan736 = useMediaQuery({
    query: '(max-width: 736px)'
  });
  return (
    <div className="app-pagination" style={styles}>
      <Pagination
        hideOnSinglePage
        current={current}
        onChange={onChange}
        total={total}
        pageSize={pageSize}
        simple={isLessThan736}
      />
    </div>
  )
}

export default WebPagination;