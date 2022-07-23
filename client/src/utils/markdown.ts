

import { marked }from 'marked';
import xss from 'xss';
import hljs from 'highlight.js';
export const translateMarkdown = (plainText: string, isGuardXss = false) => {
  return marked(isGuardXss ? xss(plainText) : plainText, {
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    breaks: true,
    smartLists: true,
    smartypants: true,
    highlight: function(code: any) {
      /*eslint no-undef: "off"*/
      return hljs.highlightAuto(code).value
    }
  })
}