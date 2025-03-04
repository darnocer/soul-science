import { visit } from 'unist-util-visit'

export default function remarkHideComments() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (parent && typeof node.value === 'string') {
        // This regex matches the pattern %%anything here%%
        const commentRegex = /%%.*?%%/g
        node.value = node.value.replace(commentRegex, '')
      }
    })
  }
}
