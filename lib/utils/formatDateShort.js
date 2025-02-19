// Returns in format: 10.04.24

const formatDateShort = (date) => {
  const parsedDate = new Date(date)
  const day = String(parsedDate.getDate()).padStart(2, '0')
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
  const year = String(parsedDate.getFullYear()).slice(-2)

  return `${month}.${day}.${year}`
}

export default formatDateShort

// ALTERNATIVE: // returns date in format Mon DD - eg. Nov 1
// import siteMetadata from '@/data/siteMetadata'

// const formatDateShort = (date) => {
//   const options = {
//     month: 'short',
//     day: '2-digit',
//   }
//   const now = new Date(date).toLocaleDateString(siteMetadata.locale, options)

//   return now
// }

// export default formatDateShort
