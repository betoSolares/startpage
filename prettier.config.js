/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  trailingComma: 'es5',
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  endOfLine: 'lf',
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '^[./].*(?<!\\.(c|le|sc)ss)$',
    '^[.]/[-a-zA-Z0-9_]+[.](module)[.](css|scss|less)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  printWidth: 80,
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};

export default config;
