import * as fetch from 'isomorphic-fetch';
import { API_BASE_URL } from '@/config';
import { message } from 'antd';
import { stringify } from 'qs';
import { get, remove } from './storage';

const baseUrl: string = API_BASE_URL;

function parseJSON(response: any) {
  return response.json();
}

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  // const error = new Error(response.statusText);
  // error.message = response;
  message.error(response.statusText)
}

type requestOptionsType = {
  [key: string]: any
}

export interface ResponseProps {
  code: number,
  data: any,
  msg: string

}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url: string, options?: requestOptionsType, config = { showMessage: false} ): Promise<any> {

  const newOptions = {  ...options };

  const token = get('token');

  let queryUrl = url;
  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
    if (!(newOptions.body instanceof FormData)) {

      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  } else if(newOptions.params) {
    queryUrl = `${url}?${stringify(newOptions.params)}`;
  }
  newOptions.headers = {
    Token: token,
    authorization: token,
    ...newOptions.headers
  }

  try {
    const response = await fetch(`${baseUrl}${queryUrl}`, newOptions);
    const data = await parseJSON(response);
    if (data.code === 401) {
      message.error(data && data.msg || 'Error!');
      remove('token'); // 身份过期，清空保存的token
      return data;
    } else if (!data || data.code !== 200) {
      message.error(data && data.msg || 'Error!');
      return;
    } else if(config.showMessage) {
      message.success(data.msg || 'OK!');
    }
    return (data.data);
  } catch (err) {
    return ({ err });
  }
}
