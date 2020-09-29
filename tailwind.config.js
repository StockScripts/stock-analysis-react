module.exports = {
  purge: [
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.ts',
    'src/**/*.tsx',
    'public/**/*.html',
  ],
  theme: {
    extend: {
      margin: {
        '45': '4.5rem'
      },
      opacity: {
        '80': .80
      },
      height: {
        '96': '24rem;'
      },
    },
  },
  variants: {},
  plugins: [],
}