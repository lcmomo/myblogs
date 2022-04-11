// 获取 url query 参数
interface decodeParams {
  [key: string]: any;
}
export const decodeQuery = (url: string) => {
  const params: decodeParams = {};
  const paramsStr = url.replace(/\.*\?/, ''); // a=1&b=2&c=&d=xxx&e
  paramsStr.split('&').forEach(v => {
    const d = v.split('=');
    if (d[1] && d[0]) params[d[0]] = d[1];
  })
  return params;
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:|http:)/.test(path);
}

export function calcCommentsCount (commentList: Array<any>): number {
  let count = commentList.length;
  commentList.forEach(item => {
    count += item?.replies?.length || 0;
  });
  return count;
}