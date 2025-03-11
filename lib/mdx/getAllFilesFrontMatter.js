import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import getAllFilesRecursively from '@/lib/utils/files'

const root = process.cwd()

//getAllFilesFrontMatter - Returns: An array of frontmatter objects from all files inside /content/blog/ and any subdirctories by default. Optionally specify a subdirectory to return only those files in the specified subdirectory.

export async function getAllFilesFrontMatter(typeFilter = '') {
  const contentPath = path.join(root, 'content', 'blog')
  const files = getAllFilesRecursively(contentPath)
  let allFrontMatter = []

  files.forEach((file) => {
    const fileName = file.replace(contentPath + '/', '')
    if (!fileName.endsWith('.md') && !fileName.endsWith('.mdx')) return

    const source = fs.readFileSync(file, 'utf8')
    const { data: frontmatter } = matter(source)

    if (!frontmatter.draft) {
      allFrontMatter.push({
        ...frontmatter,
        slug: fileName.replace(/(\.mdx|\.md)$/, ''),
        date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
      })
    }
  })

  if (typeFilter) {
    const normalizedFilter = typeFilter.toLowerCase()
    allFrontMatter = allFrontMatter.filter((post) => {
      const postType = String(post.content_type || '').toLowerCase()
      return typeFilter.startsWith('!') ? postType !== normalizedFilter.slice(1) : postType === normalizedFilter
    })
  }

  return allFrontMatter.sort((a, b) => new Date(b.date) - new Date(a.date))
}
