module.exports = {
  semi: false,
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  jsxSingleQuote: true, // Use single quotes in JSX
  overrides: [
    {
      files: ['*.mdx', '*.md'],
      options: {
        proseWrap: 'preserve',
        htmlWhitespaceSensitivity: 'ignore',
        embeddedLanguageFormatting: 'off',
      },
    },
  ],
}
