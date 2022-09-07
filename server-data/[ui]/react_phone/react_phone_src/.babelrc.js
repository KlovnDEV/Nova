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

module.exports = {
  presets: presets,
  plugins: plugins,
};
