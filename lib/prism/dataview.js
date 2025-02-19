// prism-dataview.js
import Prism from 'prismjs'

Prism.languages.dataview = {
  comment: /\/\/.*/,
  keyword: /\b(TABLE WITHOUT ID|FROM|FLATTEN|WHERE|GROUP BY|AND|OR|this|AS)\b/,
  function: /\b\w+(?=\()/,
  operator: /=|=>|!=/,
  variable: /#[\w/]+/,
  string: {
    pattern: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
    greedy: true,
  },
  punctuation: /[.,()]/,
}
