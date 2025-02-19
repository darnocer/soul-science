const fs = require('fs')
const globby = require('globby')
const matter = require('gray-matter')
const prettier = require('prettier')
const siteMetadata = require('../data/siteMetadata')

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')

  const pages = await globby([
    'pages/*.js',
    'pages/*.tsx',
    'content/blog/**/*.mdx',
    'content/blog/**/*.md',
    '!pages/about.js',
    '!pages/_*.js',
    '!pages/_*.tsx',
    '!pages/api',
    '!pages/404.js',
  ])

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            // Read front matter (if applicable)
            const source = fs.existsSync(page) && fs.readFileSync(page, 'utf8')
            const fm = source && matter(source)

            // Skip drafts and canonicalUrl references
            if (fm?.data?.draft) return
            if (fm?.data?.canonicalUrl) return

            // Normalize paths
            const path = page
              .replace('pages/', '/')
              .replace('content/blog/', '/')
              .replace('public/', '/')
              .replace(/\.(js|tsx|mdx|md)$/, '')

            const route = path === '/index' ? '' : path

            return `
              <url>
                  <loc>${siteMetadata.siteUrl}${route}</loc>
              </url>
            `
          })
          .filter(Boolean)
          .join('')}
    </urlset>
  `

  // Format and write the sitemap
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  fs.writeFileSync('public/sitemap.xml', formatted)
})()
