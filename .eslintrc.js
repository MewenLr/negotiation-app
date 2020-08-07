module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'linebreak-style': 'off',
    'no-return-assign': 'off',
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'lines-between-class-members': 'off',
    'prefer-promise-reject-errors': 'off',
    'max-len': ['error', { code: 150 }],
    'no-param-reassign': ['error', { props: false }],
    'padded-blocks': ['error', { classes: 'always' }],
    'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
    'prefer-destructuring': ['error', { object: true, array: false }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/src/**/*.test.{j,t}s?(x)',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
      env: {
        jest: true,
      },
    },
    {
      files: ['*.dataset.ts'],
      rules: {
        '@typescript-eslint/camelcase': 'off',
      },
    },
  ],
}
