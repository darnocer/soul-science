import { visit } from 'unist-util-visit'

export default function remarkCallouts() {
  return (tree) => {
    visit(tree, 'blockquote', (node, index, parent) => {
      const children = node.children || []
      const firstChild = children[0]

      if (
        firstChild &&
        firstChild.type === 'paragraph' &&
        firstChild.children &&
        firstChild.children.length > 0 &&
        firstChild.children[0].type === 'text'
      ) {
        const firstLineText = firstChild.children[0].value
        const calloutMatch = firstLineText.match(/^\[!(.*?)\]\s*(.*)/)

        if (calloutMatch) {
          const calloutType = calloutMatch[1].trim()
          const title = calloutMatch[2].trim()
          children.shift() // Remove the title line

          const text = children
            .map((child) => {
              // If the child is a paragraph, join its text nodes, otherwise return an empty string
              return child.type === 'paragraph' ? child.children.map((c) => c.value).join('') : ''
            })
            .join('\n')
            .trim() // Trim the text content

          const calloutComponent = {
            type: 'mdxJsxFlowElement',
            name: 'Callout',
            attributes: [
              { type: 'mdxJsxAttribute', name: 'type', value: calloutType },
              { type: 'mdxJsxAttribute', name: 'title', value: title },
              text && { type: 'mdxJsxAttribute', name: 'text', value: text },
            ].filter(Boolean),
            children: [],
          }

          // Replace the original node with our Callout component node
          parent.children.splice(index, 1, calloutComponent)
        }
      }
    })
  }
}
