const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const customColors = require('./colors')

const sharedTypographyStyles = {
  css: [
    {
      fontWeight: 400,
      // base color
      color: colors.gray[900],
      // paragraphs
      p: {
        fontSize: '1.2rem',
      },
      li: {
        fontSize: '1.2rem',
      },
      'ul,ol': {
        marginBottom: '24px',
      },
      // links
      a: {
        fontWeight: 600,
        color: customColors.primary[500],
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          color: customColors.primary[600],
          textDecoration: 'underline',
        },
      },
      // headings
      h1: {
        fontWeight: '800',
        color: colors.gray[800],
        fontSize: '3rem',
        fontFamily: 'ITC Avant Garde Pro',
      },
      h2: {
        fontWeight: '800',
        color: colors.gray[900],
        fontSize: '2.5rem',
        marginBottom: '0.5em',
        marginTop: '1em',
        fontFamily: 'ITC Avant Garde Pro',
      },
      h3: {
        fontWeight: '800',
        color: colors.gray[900],
        fontSize: '2rem',
        fontFamily: 'ITC Avant Garde Pro',
      },
      h4: {
        color: colors.gray[900],
        fontWeight: '800',
        fontSize: '1.5rem',
        fontFamily: 'ITC Avant Garde Pro',
      },
      h5: {
        color: colors.gray[900],
        fontSize: '1.25rem',
        fontWeight: '800',
        fontFamily: 'ITC Avant Garde Pro',
      },
      h6: {
        color: colors.gray[900],
        fontSize: '1rem',
        fontWeight: '800',
        fontFamily: 'ITC Avant Garde Pro',
      },

      // code
      pre: {
        backgroundColor: colors.gray[800],
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.75)',
      },
      code: {
        backgroundColor: colors.gray[200],
        color: colors.gray[700],
        padding: '3px',
        borderRadius: '0.15rem',
      },
      'pre code': {
        backgroundColor: 'transparent', // Ensure code blocks have no background here
      },

      // misc
      details: {
        backgroundColor: colors.gray[200],
      },
      hr: {
        borderColor: colors.gray[200],
      },
      'ol li::marker': {
        fontWeight: '600',
        color: colors.gray[500],
      },
      'ul li::marker': {
        backgroundColor: colors.gray[500],
      },
      strong: {
        fontWeight: '800',
        color: colors.gray[800],
      },
      blockquote: {
        borderLeftColor: customColors.secondary[500],
        color: colors.gray[700],
      },
    },
  ],
}

module.exports = {
  experimental: {
    // optimizeUniversalDefaults: true,
  },
  content: ['./pages/**/*.js', './components/**/*.js', './layouts/**/*.js', './lib/**/*.js', './data/**/*.mdx'],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontSize: {
        xxs: '.70rem',
      },
      fontFamily: {
        sans: ['ITC Avant Garde Pro', ...defaultTheme.fontFamily.sans],
        serif: ['Domine', ...defaultTheme.fontFamily.serif],
      },
      fontWeight: {
        normal: 500,
      },
      colors: {
        ...customColors,
      },
      borderWidth: {
        1: '1px',
        0.5: '0.5px',
      },
      boxShadow: {
        greenDark: '0 0 22px 8px rgba(5, 255, 0, .25)',
        green: '0 0 22px 8px rgba(39, 161, 133, .25)',
        yellow: '0 0 22px 8px rgba(236, 172, 69, .25)',
        code: '0 8px 16px rgba(0, 0, 0, 0.75)',
        tealDark: '0 0 20px 5px rgba(48, 161, 133, .25)',
        teal: '0 0 20px 5px rgba(48, 161, 133, .1)',
        white: '0 0 10px 1px rgba(255, 255, 255, .1)',
      },
      typography: (theme) => ({
        DEFAULT: sharedTypographyStyles,
        dark: {
          css: {
            ...sharedTypographyStyles.css[0],
            // fontFamily: defaultTheme.fontFamily.serif,
            color: colors.gray[200],
            a: {
              ...sharedTypographyStyles.css[0].a,
              color: customColors.primary[500],
              '&:hover': {
                color: customColors.primary[400],
                textDecoration: 'underline',
              },
            },
            h1: {
              ...sharedTypographyStyles.css[0].h1,
              color: colors.gray[200],
            },
            h2: {
              ...sharedTypographyStyles.css[0].h2,
              color: colors.gray[200],
            },
            h3: {
              ...sharedTypographyStyles.css[0].h3,
              color: colors.gray[200],
            },
            'h4,h5,h6': {
              color: colors.gray[200],
            },
            pre: {
              backgroundColor: colors.gray[800],
            },
            code: {
              ...sharedTypographyStyles.css[0].code,
              backgroundColor: colors.gray[700],
              color: colors.gray[200],
            },
            'pre code': {
              backgroundColor: colors.gray[800],
            },
            details: {
              backgroundColor: colors.gray[800],
            },
            hr: {
              borderColor: colors.gray[700],
            },
            'ol li::marker': {
              ...sharedTypographyStyles.css[0]['ol li::marker'],
              color: colors.gray[400],
            },
            'ul li::marker': {
              backgroundColor: colors.gray[400],
            },
            strong: {
              ...sharedTypographyStyles.css[0].strong,
              color: colors.gray[100],
            },
            blockquote: {
              ...sharedTypographyStyles.css[0].blockquote,
              color: colors.gray[400],
            },
            thead: {
              th: {
                color: colors.gray[100],
              },
            },
            tbody: {
              tr: {
                borderBottomColor: colors.gray[700],
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  // function({ addBase, theme }) {
  //   addBase({
  //     html: { fontFamily: theme('fontFamily.serif') },
  //   })
  // },
}
