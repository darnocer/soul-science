import Image from 'next/image'

const BASE_PATH = '/static/images/tips/'

// TODO::dynamically return image file based on category name

const categoryToImagePath = {
  obsidian: 'obsidian.png',
  css: 'css.png',
  html: 'html.png',
  efficiency: 'efficiency.png',
  git: 'git.png',
  macos: 'macos.png',
  next: 'next.png',
  tailwind: 'tailwind.png',
  terminal: 'terminal.png',
  vscode: 'vscode.png',
  webflow: 'webflow.png',
  prism: 'prism.png',
  default: 'default.png',
}

const imageSelector = (category, title) => {
  const imagePath = BASE_PATH + (categoryToImagePath[category] || categoryToImagePath.default)

  return <Image src={imagePath} alt={title} width="50" height="50" />
}

export default imageSelector
