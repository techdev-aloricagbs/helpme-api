module.exports = {
  env: {
    browser: false,
    jest: true,
    es6: true,
  },
  extends: 'airbnb',
  rules: {
    'func-names': 'off',
    'no-new': 'off',
    'no-dynamic-require': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
  },
  parserOptions: {
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: [
          '.',
          'src',
          'node_modules',
        ],
      },
    },
  },
};
