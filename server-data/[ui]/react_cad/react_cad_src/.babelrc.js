const plugins = [
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  ['@babel/plugin-transform-runtime', {
    regenerator: true,
    helpers: false,
    useESModules: true
  }],
];

const presets = [
  [
    '@babel/preset-env',
    {
      targets: { esmodules: true },
    },
  ],
  '@babel/react',
  '@babel/typescript',
];

if (process.env.NODE_ENV === 'development' || process.argv.includes('development')) {
  plugins.push('react-refresh/babel');
}

module.exports = {
  presets: presets,
  plugins: plugins,
};
