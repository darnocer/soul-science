#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import getAllFilesRecursively from '../lib/utils/files.js'

const root = process.cwd()

function checkInternalLinks(content, postSlug, allSlugs) {
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

async function runCheck() {
  console.log('\n🔍 Checking for broken internal links...\n')

  const contentPath = path.join(root, 'content', 'blog')
  const allFiles = getAllFilesRecursively(contentPath)
  const allSlugs = new Set(allFiles.map((file) => path.basename(file, path.extname(file))))

  allFiles.forEach((file) => {
    if (!file.endsWith('.mdx') && !file.endsWith('.md')) return

    const source = fs.readFileSync(file, 'utf8')
    const { content } = matter(source)
    const postSlug = path.basename(file, path.extname(file))

    checkInternalLinks(content, postSlug, allSlugs)
  })

  console.log('\n✅ Internal link check complete.\n')
}

runCheck()
