module.exports = {
  extends: [
    'stylelint-prettier/recommended',
    'stylelint-config-prettier',
    'stylelint-config-sass-guidelines',
    'stylelint-config-hudochenkov/full',
  ],
  plugins: ['stylelint-prettier', 'stylelint-scss', 'stylelint-order'],
  rules: {
    'at-rule-no-unknown': null,
    linebreaks: 'windows',
    'max-nesting-depth': null,
    'selector-max-type': null,
    'string-quotes': 'single',
    indentation: 2,
    'prettier/prettier': [
      true,
      {
        endOfLine: 'crlf',
      },
    ],
    'selector-class-pattern': null,
    'order/properties-alphabetical-order': null,
    'selector-max-compound-selectors': null,
    'no-descending-specificity': null,
    'scss/dollar-variable-pattern': null,
    'block-closing-brace-newline-after': [
      'always',
      {
        ignoreAtRules: ['if', 'else'],
      },
    ],
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['after-same-name', 'inside-block', 'first-nested'],
      },
      {
        ignoreAtRules: ['if', 'else'],
      },
    ],
    'time-min-milliseconds': null,
    'declaration-no-important': null,
    'scss/at-extend-no-missing-placeholder': null,
    'function-name-case': null,
    'scss/at-function-pattern': null,
  },
};
