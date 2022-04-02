import { useEffect, useState, useCallback } from 'react';
import request from '@/utils/request';

import { useLocation, useHistory } from 'react-router-dom';
import { decodeQuery } from '@/utils';
import useMount from './use_mount';

/**
 * fetchList
 * requestUrl 请求地址
 * queryParams 请求参数
 * withLoading 是否携带 loading
 * fetchDependence 依赖 => 可以根据地址栏解析拉取列表
 */
export default function useFetchList({
  requestUrl = '',
  queryParams = {},
  withLoading = true,
  fetchDependence = []
}: any) {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({current: 1, pageSize: 10, total: 0});

  const location = useLocation();
  const history = useHistory();

  useMount(() => {
    if (fetchDependence.length === 0) {
      fetchWithLoading();
    }
  });

  useEffect(() => {
    if (fetchDependence.length > 0) {
      const params = decodeQuery(location.search);
      fetchWithLoading(params)
    }
  }, fetchDependence);

  function fetchWithLoading(params?: any ) {
    withLoading && setLoading(true);
    fetchDataList(params);
  }

  function fetchDataList(params?: any ) {
    const requestParams = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...queryParams,
      ...params,
    };
    request(requestUrl, { params: requestParams}).then(res => {
      const { count, rows } = res;
      setPagination({
        total: count,
        current: requestParams.page,
        pageSize: requestParams.pageSize
      });
      setDataList(rows);
      withLoading && setLoading(false);
    }).catch(e => withLoading && setLoading(false));
  }

  const onFetch = useCallback(params => {
    withLoading && setLoading(true);
    fetchDataList(params);
  }, [queryParams]);
  const handleChange = useCallback(page => {
    const search = location.search.includes('page=') ?
    location.search.replace(/(page=)(\d+)/, `$1${page}`) : `?page=${page}`;
    const jumpUrl = location.pathname + search;
    history.push(jumpUrl);
  }, [queryParams, location.pathname]);

  return {
    dataList,
    loading,
    pagination: {
      ...pagination,
      onChange: handleChange
    },
    onFetch
  }
}
