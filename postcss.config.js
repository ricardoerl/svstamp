const purgecss = [
  '@fullhuman/postcss-purgecss',
  {
    content: [
      './components/**/*.js',
      './components/**/*.tsx',
      './components/**/*.ts',
      './pages/**/*.js',
      './pages/**/*.tsx',
      './pages/**/*.ts',
    ],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
];
module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    'autoprefixer',
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
