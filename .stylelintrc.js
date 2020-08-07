module.exports = {
  'extends': 'stylelint-config-sass-guidelines',
  'plugins': [
    'stylelint-scss',
  ],
  'rules': {
    'indentation': 2,
    'scss/at-import-no-partial-leading-underscore': null,
    'selector-no-qualifying-type': [true, {
      'ignore': ['class'],
    }],
    'max-nesting-depth': [3, {
      'ignore': ['pseudo-classes'],
    }],
  }
}
