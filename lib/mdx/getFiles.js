import path from 'path'
import getAllFilesRecursively from '@/lib/utils/files'

const root = process.cwd()

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
