'use client'

/* eslint-disable react/display-name */
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import dynamic from 'next/dynamic'

import Image from '@/components/blocks/Image'
import CustomLink from '@/components/links/Link'
import TOCInline from '@/components/post/TOCInline'
import Pre from '@/components/blocks/Pre'
import { BlogNewsletterForm } from '@/components/blocks/NewsletterForm'
import PageTitle from '@/components/headings/PageTitle'
import CodeContainer from '@/components/layout/CodeContainer'
import Callout from '@/components/blocks/Callout'
import Heading from '@/components/headings/Heading'
import DefinitionCallout from '@/components/blocks/DefinitionCallout'
import CtaButton from '@/components/links/CtaButton'
import Status from '@/components/flare/Status'
import Testimonial from '@/components/blocks/Testimonial'
import CardGrid from '@/components/blocks/CardGrid'
import Breadcrumbs from '@/components/links/Breadcrumbs'
import TimeOfDayText from '@/components/flare/TimeOfDayText'

export const MDXComponents = {
  Image,
  TOCInline,
  PageTitle,
  CodeContainer,
  Callout,
  Heading,
  DefinitionCallout,
  CtaButton,
  Status,
  CardGrid,
  Testimonial,
  Breadcrumbs,
  TimeOfDayText,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm: BlogNewsletterForm,
  wrapper: ({ components, layout, ...rest }) => {
    if (!layout) {
      return <div {...rest} />
    }
    const Layout = dynamic(() => import(`./layout/${layout}`).then((mod) => mod.default))
    return <Layout {...rest} />
  },
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
