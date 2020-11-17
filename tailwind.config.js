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
      colors: {
        'palette-dark': '#5D5C61',
        'palette-green-light': '#65CCB8',
        'palette-green-med': '#57BA98',
        'palette-green-dark': '#3B945E',
        'palette-light': '#F2F2F2',
      }
    },
  },
  variants: {},
  plugins: [],
}