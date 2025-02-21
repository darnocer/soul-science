const siteMetadata = {
  title: 'Soul Science Wellness',
  author: 'Darian',
  description: 'Lorem ipsum',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://www.soul-science.com',
  siteRepo: 'https://github.com/darnocer/soul-science',
  siteLogo: '/static/images/logos/logo.png',
  image: '/static/images/authors/darian.png',
  socialBanner: '/static/images/default-social-share.png',
  website: 'https://www.dnocera.com',
  email: 'darian@soul-science.com',
  github: 'https://github.com/darnocer',
  twitter: null,
  facebook: null,
  youtube: null,
  linkedin: 'https://www.linkedin.com/in/darian-nocera',
  locale: 'en-US',
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports plausible, simpleAnalytics, umami or googleAnalytics
    plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    umamiWebsiteId: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    googleAnalyticsId: 'G-PZX4BZDHLP', // e.g. UA-000000-2 or G-XXXXXXX
    posthogAnalyticsId: '', // posthog.init e.g. phc_5yXvArzvRdqtZIsHkEm3Fkkhm3d0bEYUXCaFISzqPSQ
  },
  newsletter: {
    provider: 'convertkit',
  },
  comment: {
    provider: '',
  },
}

module.exports = siteMetadata
