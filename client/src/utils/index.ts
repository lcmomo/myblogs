import { marked } from 'marked'
import { COLOR_LIST } from '@/utils/config'
import xss from 'xss'

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

// 计算评论数
export function calcCommentsCount (commentList: Array<any>): number {
  let count = commentList.length;
  commentList.forEach(item => {
    count += item?.replies?.length || 0;
  });
  return count;
}

// 转化 md 语法为 html
// export const translateMarkdown = (plainText: string, isGuardXss = false) => {
//   return marked.parse(isGuardXss ? xss(plainText) : plainText, {
//     renderer: new marked.Renderer(),
//     gfm: true,
//     pedantic: false,
//     sanitize: false,
//     tables: true,
//     breaks: true,
//     smartLists: true,
//     smartypants: true,
//     highlight: function(code: any) {
//       /*eslint no-undef: "off"*/
//       return hljs.highlightAuto(code).value
//     }
//   });
// }