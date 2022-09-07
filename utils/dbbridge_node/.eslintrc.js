const rules = {
    semi: 1,
    eqeqeq: 'off',
    'no-unused-vars': 'warn',
    'no-use-before-define': 'off',
    'no-console': 'off',
    'func-names': 'off',
    'no-process-exit': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    'react/jsx-filename-extension': [0],
    'import/no-unresolved': [2, { caseSensitive: false }],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'global-require': 'off',
    'jsx-a11y/tabindex-no-positive': 'off',
    'react/display-name': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-param-reassign': ['error', { 'props': true, 'ignorePropertyModificationsForRegex': ['^out'] }],
    'import/extensions': [
        'error',
        'ignorePackages',
        {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
        },
    ],
}

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    $: 'readonly',
    ASSETS: 'readonly',
    DEVELOPMENT: 'readonly',
    _: 'readonly',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
        'prettier/@typescript-eslint',
      ],
      plugins: ['@typescript-eslint', 'prettier', 'import'],
      rules: rules,
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        // optional
        project: './tsconfig.json',
      },
      node: {
        // optional
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      webpack: {
        config: 'build/webpack.base.conf.js',
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
