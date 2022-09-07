const rules = {
  semi: 1,
  eqeqeq: 'off',
  'no-unused-vars': 'warn',
  'no-use-before-define': 'off',
  'no-console': 'off',
  'func-names': 'off',
  'lines-between-class-members': 'off',
  '@typescript-eslint/lines-between-class-members': ['off'],
  'no-process-exit': 'off',
  'object-shorthand': 'off',
  // 'class-methods-use-this': 'off',
  //   'import/no-unresolved': [2, { caseSensitive: false }],
  'global-require': 'off',
  // 'no-param-reassign': ['error', { props: true, ignorePropertyModificationsForRegex: ['^out'] }],
  'no-param-reassign': 'off',
  'import/no-default-export': 0,
  'import/prefer-default-export': 'off',
  "no-restricted-syntax": ["error", "WithStatement", "BinaryExpression[operator='in']"],
  'no-underscore-dangle': 'off',
};

module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    DEVELOPMENT: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: [
          './tsconfig-base.json',
          './client/tsconfig.json',
          './server/tsconfig.json',
          './shared/tsconfig.json',
        ],
      },
      extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      plugins: ['@typescript-eslint', 'prettier', 'import'],
      rules: rules,
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        // optional
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/parsers': {
      // optional
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/extensions': ['.ts', '.tsx'],
  },
  rules: rules,
};
