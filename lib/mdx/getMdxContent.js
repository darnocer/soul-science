import { bundleMDX } from 'mdx-bundler'
import fs from 'fs'
import path from 'path'
import readingTime from 'reading-time'
import { visit } from 'unist-util-visit'
import { checkInternalLinks, getAllSlugs } from '@/lib/utils'

import * as remarkPlugins from '@/lib/remark'

import * as rehypePlugins from '@/lib/rehype'

const root = process.cwd()

// getMdxContent - Returns: An object containing the processed MDX source, a table of contents, and frontmatter (metadata) of the file. Intended for (content, blog, [slug]) - UPDATE to include /content/blog by default
export async function getMdxContent(slug) {
  const contentPath = path.join(root, 'content', 'blog')
  const mdxPath = path.join(contentPath, `${slug}.mdx`)
  const mdPath = path.join(contentPath, `${slug}.md`)

  if (!fs.existsSync(mdxPath) && !fs.existsSync(mdPath)) {
    throw new Error(`Content file not found: ${mdxPath} or ${mdPath}`)
  }

  const source = fs.existsSync(mdxPath) ? fs.readFileSync(mdxPath, 'utf8') : fs.readFileSync(mdPath, 'utf8')

  const allSlugs = getAllSlugs()
  checkInternalLinks(source, slug, allSlugs)

  process.env.ESBUILD_BINARY_PATH = path.join(
    root,
    'node_modules',
    'esbuild',
    process.platform === 'win32' ? 'esbuild.exe' : 'bin/esbuild'
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
        remarkPlugins.remarkSqueezeParagraphs,
        remarkPlugins.remarkGfm,
        remarkPlugins.remarkCodeTitles,
        [remarkPlugins.remarkFootnotes, { inlineNotes: true }],
        remarkPlugins.remarkMath,
        remarkPlugins.remarkImgToJsx,
        remarkPlugins.remarkBreaks,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypePlugins.rehypeSlug,
        rehypePlugins.rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: { className: 'heading-anchor' },
        },
        rehypePlugins.rehypeKatex,
        [rehypePlugins.rehypeCitation, { path: path.join(root, 'data') }],
        [rehypePlugins.rehypePrismPlus, { ignoreMissing: true }],
        rehypePlugins.rehypePresetMinify,
        () => (tree) => {
          visit(tree, 'element', (node, index, parent) => {
            if (
              node.tagName === 'p' &&
              node.children.length === 1 &&
              node.children[0].type === 'text' &&
              node.children[0].value.match(/^\u200C$/)
            ) {
              parent.children.splice(index, 1)
            }
          })
        },
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
      slug,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    },
  }
}
