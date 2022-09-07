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
  'react/require-default-props': 'off',
  'react/no-unused-prop-types': 'off',
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
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      excludedFiles: ['*.js', '*.jsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typesctipt-eslint'],
      extends: [
        'airbnb-typescript',
        'airbnb-typescript/base',
        'airbnb-typescript-prettier',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      plugins: ['@typescript-eslint', 'import'],
      rules: rules,
    },
    {
      files: ['*.js', '*.jsx'],
      excludedFiles: ['*.ts', '*.tsx'],
      parser: 'babel-eslint',
      extends: [
        'standard',
        'airbnb',
        'airbnb-base',
        'node',
        'plugin:react/recommended',
        'prettier',
        'plugin:prettier/recommended',
      ],
      plugins: [
        'standard',
        'babel',
        'import',
        'jsx-a11y',
        'node',
        'promise',
        'react',
        'react-hooks',
        'prettier',
      ],
      rules: {
        ...rules,
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
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
      'babel-eslint': ['.js', '.jsx'],
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.scss'],
  },
  rules: rules,
};
