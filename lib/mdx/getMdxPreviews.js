import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import { serialize } from 'next-mdx-remote/serialize'

import * as remarkPlugins from '@/lib/remark'

import * as rehypePlugins from '@/lib/rehype'

const root = process.cwd()

export async function getMdxPreviews(maxLength = 1500, contentType = 'musings') {
  const contentPath = path.join(root, 'content', 'blog')

  if (!fs.existsSync(contentPath)) {
    throw new Error(`Content directory not found: ${contentPath}`)
  }

  const files = fs.readdirSync(contentPath).filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))

  const previews = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(contentPath, file)
      const source = fs.readFileSync(filePath, 'utf8')

      if (!source) return null

      const { data: frontmatter, content } = matter(source)

      if (!frontmatter || !frontmatter.content_type || !frontmatter.content_type.includes(contentType)) {
        return null
      }

      if (frontmatter.draft) {
        return null
      }

      const isTruncated = content.length > maxLength
      let truncatedContent = isTruncated ? content.slice(0, maxLength) + '...' : content

      if (isTruncated) {
        truncatedContent += ` <a href="/${file.replace(/\.(mdx|md)$/, '')}" className="text-sm">Read More →</a>`
      }

      const mdxSource = await serialize(truncatedContent, {
        mdxOptions: {
          remarkPlugins: [
            remarkPlugins.remarkGfm,
            remarkPlugins.remarkFootnotes,
            remarkPlugins.remarkMath,
            remarkPlugins.remarkExtractFrontmatter,
            remarkPlugins.remarkCodeTitles,
            remarkPlugins.remarkImgToJsx,
            remarkPlugins.remarkHideComments,
            remarkPlugins.remarkCallouts,
          ],
          rehypePlugins: [
            rehypePlugins.rehypeSlug,
            rehypePlugins.rehypeAutolinkHeadings,
            rehypePlugins.rehypeKatex,
            rehypePlugins.rehypeCitation,
            [rehypePlugins.rehypePrismPlus, { ignoreMissing: true }],
            rehypePlugins.rehypePresetMinify,
          ],
        },
      })

      return {
        mdxSource,
        isTruncated,
        frontMatter: {
          readingTime: readingTime(content),
          slug: file.replace(/\.(mdx|md)$/, ''),
          date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
          ...frontmatter,
        },
      }
    })
  )

  return previews.filter(Boolean).sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date))
}
