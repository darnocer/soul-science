const siteMetadata = {
  title: 'Darian Nocera',
  author: 'Darian',
  description:
    'Darian is a former project manager turned transformational wellness mentor specializing in spiritual healing, psychedelic journeys, and mindfulness & meditation.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://www.dnocera.com',
  siteRepo: 'https://github.com/darnocer/blog',
  siteLogo: '/static/images/logos/logo.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/default-social-share.png',
  website: 'https://www.dnocera.com',
  email: 'd@rootedvision.co',
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
    googleAnalyticsId: 'G-ME5JD5RWNR', // e.g. UA-000000-2 or G-XXXXXXX
    posthogAnalyticsId: '', // posthog.init e.g. phc_5yXvArzvRdqtZIsHkEm3Fkkhm3d0bEYUXCaFISzqPSQ
  },
  newsletter: {
    provider: 'convertkit',
  },
  comment: {
    provider: null,
  },
}

module.exports = siteMetadata
