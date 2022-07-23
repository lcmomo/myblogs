import * as fetch from 'isomorphic-fetch';
import { API_BASE_URL } from '@/config';
import { message } from 'antd';
import { stringify } from 'qs';

const getToken = () => 't';
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
  //console.log(options.body instanceof FormData);
 
  const newOptions = {  ...options };
  // const storgetoken=localStorage.getItem('userInfo')!==null ? JSON.parse(localStorage.getItem('userInfo')).token : null
  const token = getToken();

  let queryUrl = url;
  // console.log('token: ', token)
  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
    if (!(newOptions.body instanceof FormData)) {

      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        authorization: token,
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        authorization: token,
        ...newOptions.headers,
      };
    }
  } else if(newOptions.params) {
    queryUrl = `${url}?${stringify(newOptions.params)}`;
  }
  newOptions.headers = {
    authorization: token,
    ...newOptions.headers
  }

  try {
    const response = await fetch(`${baseUrl}${queryUrl}`, newOptions);
    const response_1 = await checkStatus(response);
    const data = await parseJSON(response_1);
    if (!data || data.code !== 200) {
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
