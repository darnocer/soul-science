import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import getAllFilesRecursively from '@/lib/utils/files'

const root = process.cwd()

//getAllFilesFrontMatter - Returns: An array of frontmatter objects from all files inside /content/blog/ and any subdirctories by default. Optionally specify a subdirectory to return only those files in the specified subdirectory.

export async function getAllFilesFrontMatter(subdirectory = '') {
  const basePath = path.join(root, 'content', 'blog')
  const searchPath = subdirectory ? path.join(basePath, subdirectory) : basePath
  const files = getAllFilesRecursively(searchPath)
  let allFrontMatter = []

  files.forEach((file) => {
    const fileName = file.slice(searchPath.length + 1).replace(/\\/g, '/')
    if (!fileName.endsWith('.md') && !fileName.endsWith('.mdx')) {
      return
    }
    const source = fs.readFileSync(file, 'utf8')
    const { data: frontmatter } = matter(source)

    // Exclude draft posts
    if (!frontmatter.draft) {
      allFrontMatter.push({
        ...frontmatter,
        slug: fileName.replace(/(\.mdx|\.md)$/, ''), // Remove file extension for slug
        date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
      })
    }
  })

  // Sort posts by date in descending order
  return allFrontMatter.sort((a, b) => new Date(b.date) - new Date(a.date))
}
