import visit from 'unist-util-visit'

const remarkImageSyntax = () => {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (parent.type === 'paragraph' && node.value.includes('![[')) {
        const regex = /!\[\[(.*?)\]\]/g
        let match
        while ((match = regex.exec(node.value))) {
          const imgName = match[1]
          const markdownImageSyntax = `![${imgName}](/static/images/posts/${imgName})`
          node.value = node.value.replace(match[0], markdownImageSyntax)
        }
      }
    })
  }
}

export default remarkImageSyntax
