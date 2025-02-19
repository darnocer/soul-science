import { bundleMDX } from 'mdx-bundler'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import { serialize } from 'next-mdx-remote/serialize'
import { visit } from 'unist-util-visit'
import removeMarkdown from 'remove-markdown'
import getAllFilesRecursively from './utils/files'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkFootnotes from 'remark-footnotes'
import remarkMath from 'remark-math'
import remarkExtractFrontmatter from './mdx/remark-extract-frontmatter'
import remarkTocHeadings from './mdx/remark-toc-headings'
import remarkCodeTitles from './mdx/remark-code-title'
import remarkImgToJsx from './mdx/remark-img-to-jsx'
import remarkImageSyntax from './mdx/remark-image-syntax'
import remarkHideComments from './mdx/remark-hide-comments'
import remarkCallouts from './mdx/remark-callouts'
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs'
import remarkBreaks from 'remark-breaks'

// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'

const root = process.cwd()

export async function getMdxPreviews(basePath, type, maxLength = 500, contentType = 'musings') {
  const contentPath = path.join(root, basePath === 'content' ? 'content/blog' : 'data/blog')
  const files = fs.readdirSync(contentPath).filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))

  const previews = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(contentPath, file)
      const source = fs.readFileSync(filePath, 'utf8')
      const { data: frontmatter, content } = matter(source)

      if (!frontmatter.content_type || !frontmatter.content_type.includes(contentType)) {
        return null
      }

      if (frontmatter.draft === true) {
        return null
      }

      const isTruncated = content.length > maxLength
      let truncatedContent = content.length > maxLength ? content.slice(0, maxLength) + '...' : content

      if (isTruncated) {
        truncatedContent += ` <a href="/${file.replace(/\.(mdx|md)$/, '')}" className="text-sm">Read More →</a>`
      }

      const mdxSource = await serialize(truncatedContent, {
        mdxOptions: {
          remarkPlugins: [
            remarkGfm,
            remarkFootnotes,
            remarkMath,
            remarkExtractFrontmatter,
            remarkCodeTitles,
            remarkImgToJsx,
            remarkHideComments,
            remarkCallouts,
          ],
          rehypePlugins: [
            rehypeSlug,
            rehypeAutolinkHeadings,
            rehypeKatex,
            rehypeCitation,
            [rehypePrismPlus, { ignoreMissing: true }],
            rehypePresetMinify,
          ],
        },
      })

      // console.log(frontmatter.title, 'Truncated? ', isTruncated)

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

//formatSlug - Remove file extensions from a slug (filename)
export function formatSlug(slug) {
  return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

// getMdxContent - Returns: An object containing the processed MDX source, a table of contents, and frontmatter (metadata) of the file. Intended for (content, blog, [slug]) - UPDATE to include /content/blog by default

export async function getMdxContent(basePath, type, slug) {
  const contentPath = path.join(root, basePath === 'content' ? 'content' : 'data')
  const mdxPath = path.join(contentPath, type, `${slug}.mdx`)
  const mdPath = path.join(contentPath, type, `${slug}.md`)
  const source = fs.existsSync(mdxPath) ? fs.readFileSync(mdxPath, 'utf8') : fs.readFileSync(mdPath, 'utf8')

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'esbuild.exe')
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'bin', 'esbuild')
  }

  let toc = []
  const { code, frontmatter } = await bundleMDX({
    source,
    cwd: path.join(root, 'components'),
    xdmOptions(options, frontmatter) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkHideComments,
        remarkCallouts,
        remarkExtractFrontmatter,
        // [remarkTocHeadings, { exportRef: toc }],
        remarkSqueezeParagraphs,
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        remarkImgToJsx,
        remarkBreaks,
        // remarkImageSyntax,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: 'heading-anchor',
          },
        },
        rehypeKatex,
        [rehypeCitation, { path: path.join(root, 'data') }],
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypePresetMinify,
        () => (tree) => {
          visit(tree, 'element', (node, index, parent) => {
            if (
              node.tagName === 'p' &&
              node.children.length === 1 &&
              node.children[0].type === 'text' &&
              node.children[0].value.match(/^\u200C$/)
            ) {
              parent.children.splice(index, 1) // ✅ Removes zero-width spaces
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
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    },
  }
}

// getSectionContent - Returns: An object containing the processed MDX source, a table of contents, and frontmatter (metadata) of the file specifically for section content not blog posts (located in /content/blog)

export async function getSectionContent(slug) {
  // Set default values for basePath and directory
  const basePath = 'data'
  const directory = 'content'

  // Adjusted contentPath construction to use the default basePath and directory
  const contentPath = path.join(root, basePath, directory)
  const mdxPath = path.join(contentPath, `${slug}.mdx`)
  const mdPath = path.join(contentPath, `${slug}.md`)

  // Check if .mdx or .md file exists and read the content
  const source = fs.existsSync(mdxPath) ? fs.readFileSync(mdxPath, 'utf8') : fs.readFileSync(mdPath, 'utf8')

  // Environment setup for esbuild, adjusted to not depend on platform-specific paths
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
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkHideComments,
        remarkCallouts,
        remarkExtractFrontmatter,
        // [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        remarkImgToJsx,
        remarkBreaks,
        // remarkImageSyntax,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: 'heading-anchor',
          },
        },
        rehypeKatex,
        [rehypeCitation, { path: path.join(root, 'data') }],
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypePresetMinify,
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

  // Return object structure remains the same
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

// getFiles - Retrieves a list of files in the /content/blog directory and any subdirectories by default.
// Optionally specify a subdirectory to return only those files in the specified subdirectory.
export function getFiles(subdirectory = '') {
  const basePath = path.join(root, 'content', 'blog')
  const searchPath = subdirectory ? path.join(basePath, subdirectory) : basePath
  const files = getAllFilesRecursively(searchPath)

  // Assuming getAllFilesRecursively returns absolute paths
  return files
    .filter((file) => !path.basename(file).startsWith('.')) // Exclude hidden files (like .DS_Store)
    .map((file) => {
      const relativePath = path.relative(searchPath, file) // Convert to relative path
      return relativePath.replace(/\\/g, '/') // Normalize path separators for Windows
    })
}

//getAllFilesFrontMatter - Returns: An array of frontmatter objects from all files inside /content/blog/ and any subdirctories by default. Optionally specify a subdirectory to return only those files in the specified subdirectory.

// NOTE - this function is also defined in /scripts/airtableSync to avoid CommonJS/ES6 incompatibility with importing dependencies. Consider upating airtableSync.js with any updates to this file.
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
