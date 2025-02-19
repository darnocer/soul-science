import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { getFiles } from './mdx'
import kebabCase from './utils/kebabCase'

const root = process.cwd()

export async function getAllTypes() {
  let typeCount = {}

  const files = await getFiles()

  files.forEach((file) => {
    const source = fs.readFileSync(path.join(root, 'content', 'blog', file), 'utf8')
    const { data } = matter(source)

    if (data.content_type && data.draft !== true) {
      let types = Array.isArray(data.content_type) ? data.content_type : [data.content_type]

      types.forEach((type) => {
        const formattedType = kebabCase(type)
        if (formattedType in typeCount) {
          typeCount[formattedType] += 1
        } else {
          typeCount[formattedType] = 1
        }
      })
    }
  })

  return typeCount
}
