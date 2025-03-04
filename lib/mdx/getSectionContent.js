import { bundleMDX } from 'mdx-bundler'
import fs from 'fs'
import path from 'path'
import readingTime from 'reading-time'

import * as remarkPlugins from '@/lib/remark'

import * as rehypePlugins from '@/lib/rehype'

const root = process.cwd()

// getSectionContent - Returns: An object containing the processed MDX source, a table of contents, and frontmatter (metadata) of the file specifically for section content (located in /data/content) not blog posts

export async function getSectionContent(slug) {
  const basePath = 'data'
  const directory = 'content'

  const contentPath = path.join(root, basePath, directory)
  const mdxPath = path.join(contentPath, `${slug}.mdx`)
  const mdPath = path.join(contentPath, `${slug}.md`)

  const source = fs.existsSync(mdxPath) ? fs.readFileSync(mdxPath, 'utf8') : fs.readFileSync(mdPath, 'utf8')

  process.env.ESBUILD_BINARY_PATH = path.join(
    root,
    'node_modules',
    'esbuild',
    process.platform === 'win32' ? 'esbuild.exe' : 'bin',
    'esbuild'
  )

  let toc = []
  const { code, frontmatter } = await bundleMDX({
    source,
    cwd: path.join(root, 'components'),
    xdmOptions(options, frontmatter) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkPlugins.remarkHideComments,
        remarkPlugins.remarkCallouts,
        remarkPlugins.remarkExtractFrontmatter,
        // [remarkTocHeadings, { exportRef: toc }],
        remarkPlugins.remarkGfm,
        remarkPlugins.remarkCodeTitles,
        [remarkPlugins.remarkFootnotes, { inlineNotes: true }],
        remarkPlugins.remarkMath,
        remarkPlugins.remarkImgToJsx,
        remarkPlugins.remarkBreaks,
        // remarkImageSyntax,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypePlugins.rehypeSlug,
        rehypePlugins.rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: 'heading-anchor',
          },
        },
        rehypePlugins.rehypeKatex,
        [rehypePlugins.rehypeCitation, { path: path.join(root, 'data') }],
        [rehypePlugins.rehypePrismPlus, { ignoreMissing: true }],
        rehypePlugins.rehypePresetMinify,
      ]
      return options
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      }
      return options
    },
  })

  return {
    mdxSource: code,
    toc,
    frontMatter: {
      readingTime: readingTime(code),
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    },
  }
}
