import siteMetadata from '@/data/siteMetadata'

// NOTE - this function is also defined in /scripts/airtableSync to avoid CommonJS/ES6 incompatibility with importing dependencies. Consider upating airtableSync.js with any updates to this file.

const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const now = new Date(date).toLocaleDateString(siteMetadata.locale, options)

  return now
}
// returns date in format Month DD, YYYY - eg. November 1, 2023

export default formatDate
