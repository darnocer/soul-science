// Not currently in use, content types should be singular

const getBadgeText = (text) => {
  const defaultText = 'blog'

  if (!text) {
    return defaultText
  }

  return text.slice(0, -1) // this is -1 because the content types should be plural with an 's'
}

export default getBadgeText
