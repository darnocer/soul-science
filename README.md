# dnocera.com

![Nextjs](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Live site:** https://dnocera.com

## ⚙️ Setup

**Installation:**

```bash
npm install
npm run dev
```

- Open http://localhost:3000 in browser to view

---

## ℹ️ Overview

### Content

- All posts live in `.mdx` files in `/content/blog`
  - There are no subdirectories for post content. All slugs are added to the root url.
- `content_type` metadata appears as a `Badge` next to the post
- `tags` metadata appears as a link prefixed with `#`
- New tag and content type values can be added on the fly and dynamically generate archive pages at `/tags/*` and `/types/*`, respectively

#### Other data

- `data/content` - section and page content
- `data/cards` - data to populate `<CardGrid />`
- `data/siteMetadata.js` - site information
- `data/authors/default.md` - about me info
- `data/nav` - header/footer nav links
- `data/pageContent.js` - headers and other content

### Styling

#### General

- Typography styles are configured in `tailwindconfig.js`
  - Color palette is imported from `colors.js`
- Additional custom styling in `/css/tailwind.css`
- Custom styling for musings preview text is in `/css/previews.css`

#### Custom Styles

The following styles can be applied to `<span className=""></span>` directly within Markdown:

- `no-style` - use to remove default italic style
- `no-arrow` - to use regular bullet points instead of arrows
- `exclude-underline` - to exclude underline hover style from links in prose
- `bold-underline` - custom bold/underline style
- `list-heading` - apply to headings (eg. ##### <span className="list-heading"> List Heading</span>) to apply a custom ordered list to headings

##### Updating Fonts

Currently, a `sans` font is defined and applied to all heading and link styles, and a `serif` font is applied to all text and prose. Changing this requires updating the utility classes applied to components (eg. `font-serif`, `font-sans`)

**To add new fonts:**

1. Add font files to `public/static/fonts`
2. Add font declarations to `css/tailwind.css`:

```css
@font-face {
  font-family: Thiccboi;
  src: url('../public/static/fonts/THICCCBOI-Medium.woff2') format('opentype');
  font-weight: 500;
}
```

3. Add a declaration for each unique font weight
4. Update `fontFamily` in `tailwind.config.js`:

```json
theme: {
  ...
	extend: {
		...
		fontFamily: {
			sans: ['Thiccboi', ...defaultTheme.fontFamily.sans],
		},
		...
  }
  ...
}
```

##### Icons

Icons are defined in `@/components/icons` as a mix of `.svg` and `<React>` icons.

###### Buttons

- Icons for buttons are added as `.svg`
- New icons for buttons need to be defined in `ICONS` in `<Button/>`

## 🎨 Customization

### Add prose sections of content to a page

To add a `prose` content section to a page:

1. Create an `.mdx` file in `/data/content` with the name of the page or section (eg. `home.mdx`)
2. Add the section content as markdown.

Section headings should have a bottom border. To add a heading with a bottom border, use the `<Heading/>` component:

```jsx
<Heading text="Darian's Blog" level="h1" />
```

3. Import `MDXLayoutRenderer` and `getSectionContent()` to the page where you want to display prose content

```jsx
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getSectionContent } from '@/lib/mdx'
```

4. Retrieve the file contents by inputting the filename located in `data/content/` as the argument:

```jsx
export async function getStaticProps() {
  const homeContent = await getSectionContent('home')

  return { props: { homeContent } }
}
```

5. Set the default layout as `ContentLayout`, extract `mdxSource` and `frontMatter`, and pass as props to `<MDXLayoutRenderer />

```jsx
export default function Home({ homeContent }) {
  const { mdxSource, frontMatter } = homeContent
  const DEFAULT_LAYOUT = 'ContentLayout'

  return (
    <>
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />
    </>
  )
}
```

Note: The returned content renders as `{children}` in `layouts/ContentLayout.js`. `ContentLayout` adds a `prose` class to the return content which applies typography defaults appropriate for posts.

### Add a new page

1. Add a new file under `/pages`

- the file name is the route
- folders can be used to add subdirectories to the route

2. Follow the instructions above to import MDX content onto the page

3. Define the `DEFAULT_LAYOUT` (typically `PageLayout`)

4. Define the `PAGE_TITLE` for SEO

### Adding New Components

**To add new components:**

1. Create `NewComponent.js` in `/components` directory
2. Create the react component:

```js
// import statements

export function NewComponent({ props }) => {
// ... functions
  }

  return (
//... jsx markup
  )
}

```

**To use in MDX:**

3. Add to `MDXComponents` object in `/components/MDXComponents`:

```js
import NewComponent from './NewComponent'

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  NewComponent,
  BlogNewsletterForm: BlogNewsletterForm,
  wrapper: ({ components, layout, ...rest }) => {
    const Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  },
}
```

4. Use in `.mdx` file in the format:

```jsx
<Component prop="value" />
```

---

## 🛠️ Useful Components

### Callouts

Callouts in markdown can be utilized with the syntax:

```
> [!type] Callout text
```

`type` can be the following values which correspond to the following icons:

- `construction` --> construction
- `quote` --> quotation
- `tools` --> wrench
- `info` --> info
- `default` --> star

To add body text, simply add additional lines:

```
> [!type] Callout title
>
> This is body text
```

### SectionContainer

For any component that is intended to be a full width section, within the component file, wrap the return value in `<SectionContainer></SectionContainer>`.

`<SectionContainer>` takes two optional props: `padding` and `container`:

- `padding` - specifies the vertical padding of the section
- `container` - specifies the max-width of the container

Both props take the values `small`, `medium`, or `large`.

If not specified, the default value `medium` will apply to `padding` and `small` will apply to `container`:

- `padding.medium` = `py-5`
- `container.small` = `max-w-3xl`

### Button

Add buttons using:

```
<Button
  action=""
  text=""
  link=""
/>
```

`action` corresponds to the icon:

- `schedule` --> calendar icon
- `download` --> download icon
- `contact` --> paper plane icon

## 📄 Retrieving Post Data

**`lib/mdx.js`**:

- `getMdxContent()` - Returns: An object containing the processed MDX source, a table of contents, and frontmatter (metadata) of the file.
- `getSectionContent()` - Returns: An object containing the processed MDX source, a table of contents, and frontmatter (metadata) of the file specifically for section content not blog posts
- `getFiles()` - Retrieves a list of files in the /content/blog directory and any subdirectories by default. Optionally specify a subdirectory to return only those files in the specified subdirectory.
- `getAllFilesFrontMatter()` - Returns: An array of frontmatter objects from all files inside /content/blog/ and any subdirctories by default. Optionally specify a subdirectory to return only those files in the specified subdirectory.

**`lib/getAllTags.js`**:

- `getAllTags()` - Returns: an array of formatted tags from all posts

**`lib/getAllTypes.js`**:

- `getAllTypes()` - Returns: an array of formatted content types from all posts

#### Retrieving post list

Use `getAllFilesFrontMatter()` to retrieve a list of posts and frontmatter to be passed as a prop to `<RecentPosts/>` or `<ListLayout/>` components.

```js
export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter()

  return { props: { posts } }
}
```

```
<RecentPosts posts={posts} heading="Recent Posts" />
```

## ⭐️ Credits

I used [this AMAZING template](https://github.com/timlrx/tailwind-nextjs-starter-blog) by timlrx as a starter.

Also shout out to the [Indie Web](https://indieweb.org/). Let's make the internet great again 😏

## ✉️ Contact

Get in touch with me at [d@rootedvision.co](mailto:d@rootedvision.co).

## ✅ Todo

General:

- [ ] Remove Airtable integration workflow
- [ ] Fix `.list-heading` styles

Update README:

- [ ] Add `CardGrid`
- [ ] Add Layouts
- [ ] Add Headings and Headers
- [ ] Add SEO metadata
- [ ] New page
