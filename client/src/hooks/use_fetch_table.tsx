import request from "@/utils/request";
import { message } from "antd";
import { useCallback, useState } from "react";
import useMount from "./use_mount";

type queryParamsProps = Record<string, unknown>;

type FetchTableProps = {
  requestUrl: string,
  queryParams?: queryParamsProps,
  columns: Array<any>,
  isAdmin?: boolean,
}
type paginationProps = {
  pageSize?: number,
  current?: number,
  total?: number,
}

function useFetchTable({ requestUrl = '', queryParams = null, columns = [], isAdmin = true }: FetchTableProps) {
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [tablePagination, setTablePagination] = useState({ current: 1, pageSize: 10, total: 0});

  useMount(fetchWithLoading);

  async function fetchDataList(params?: queryParamsProps): Promise<any> {

    try {
      const fetchParams = {
        page: tablePagination.current,
        pageSize: tablePagination.pageSize,
        ...queryParams,
        ...params
      };
    const { count, rows }  =  await request(requestUrl, { params: fetchParams});
    const { page, pageSize} = fetchParams;
    if (count > 0 && count > pageSize) {
      const totalPage = Math.ceil(count / pageSize);
      if (totalPage < page) {
        return fetchDataList({page, totalPage}); // 删除了列表里只有一项且删除，则需要跳转回前一页 也即最后一页
      }
    }
    tablePagination.current = page;
    tablePagination.total = count;
    setTablePagination({...tablePagination}); // 分页
    setDataList(rows);
    } catch(e) {
      message.error(e)
    } finally {
      setLoading(false);
    }
  }

  async function fetchWithLoading(params: queryParamsProps) {
    setLoading(true);
    fetchDataList(params);
  }

  async function updateList(func: () => Promise<any>) {
    try {
      setLoading(true);
      await func();
      fetchDataList();
    } catch(e) {
      message.error(e);
    } finally {
      setLoading(false);
    }
  }
  // 分页
  function handleTableChange(pagination: paginationProps, filters: any, sorter: any) {
    if (JSON.stringify(filters) === '{}' && JSON.stringify(sorter) === '{}') {
      fetchWithLoading({page: pagination.current});
    }
  }
  // 搜索
  function onSearch(params: queryParamsProps) {
    fetchWithLoading({ page: 1, ...params })
  }

  return {
    tableProps: {
      className: isAdmin ? 'admin-table' : '',
      rowKey: 'id',
      loading,
      columns,
      dataSource: dataList,
      pagination: {
        current: tablePagination.current,
        pageSize: tablePagination.pageSize,
        total: tablePagination.total,
        showTotal: (total: number) => `共 ${total} 条`
      },
      onChange: handleTableChange
    },
    dataList,
    updateList: useCallback(updateList, [tablePagination, queryParams]),
    onSearch: useCallback(onSearch, [tablePagination, queryParams]),
    setLoading: useCallback(setLoading, [])
  }
}

export default useFetchTable;