import * as fetch from 'isomorphic-fetch';

const getToken = () => 't';
const baseUrl: string =  'api';

function parseJSON(response: any) {
  return response.json();
}

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.message = response;
  throw error;
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
export default function request(url: string, options: requestOptionsType) {
  //console.log(options.body instanceof FormData);
 
  const newOptions = {  ...options };
  // const storgetoken=localStorage.getItem('userInfo')!==null ? JSON.parse(localStorage.getItem('userInfo')).token : null
  const token = getToken();
  // console.log('token: ', token)
  if (newOptions.method === 'POST' || newOptions.method === 'PUT'|| newOptions.method==='DELETE') {
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
  }
  newOptions.headers = {
    authorization: token,
    ...newOptions.headers
  }

  return fetch(`${baseUrl}${url}`, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: ResponseProps) => ({ data }))
    .catch(err => ({ err }));
}
