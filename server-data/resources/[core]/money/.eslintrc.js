module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['standard', 'plugin:prettier/recommended'],
  globals: {
    on: 'readonly',
    onNet: 'readonly',
    emit: 'readonly',
    emitNet: 'readonly',
    setTick: 'readonly',
    clearTick: 'readonly',
  },
  plugins: ['babel', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: 1,
    eqeqeq: 'off',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'func-names': 'off',
    'no-process-exit': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    'global-require': 'off',
  },
}
