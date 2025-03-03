import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import getAllFilesRecursively from './files'

const root = process.cwd()

export function checkInternalLinks(content, postSlug, allSlugs) {
  const links = []
  const markdownLinkRegex = /\[([^\]]+)\]\((\/[^)]+)\)/g
  let match

  while ((match = markdownLinkRegex.exec(content)) !== null) {
    links.push({ text: match[1], href: match[2] })
  }

  links.forEach(({ href, text }) => {
    const linkedSlug = href.replace(/^\//, '')

    if (!allSlugs.has(linkedSlug)) {
      console.warn(`🚨 Broken internal link in "${postSlug}"\n  - Link text: "${text}"\n  - Broken URL: "${href}"`)
    }
  })
}

export function getAllSlugs() {
  const contentPath = path.join(root, 'content', 'blog')
  const allFiles = getAllFilesRecursively(contentPath)
  return new Set(allFiles.map((file) => path.basename(file, path.extname(file))))
}
