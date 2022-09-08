const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const DtsBundleWebpack = require('dts-bundle-webpack');

module.exports = env => ({
  mode: 'production',
  target: 'web',
  entry: {
    [env.entry]:  path.join(__dirname, `${env.entry}/index.ts`),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
          tsconfigRaw: require(`./${env.entry}/tsconfig.json`)
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
        minify: true,
        sourcemap: false
      }),
    ],
  },
  resolve: {
    modules: [ 'node_modules', '.' ],
    alias: {
      shared: path.resolve(__dirname, 'shared'),
      client: path.resolve(__dirname, 'client'),
      server: path.resolve(__dirname, 'server'),
    },
    preferRelative: true,
    extensions: ['.ts'],
    plugins: [new TsconfigPathsPlugin({ configFile: `${env.entry}/tsconfig.json` })],
  },
  plugins: [
    new DtsBundleWebpack({
      name: env.entry,
      main: `../types/${env.entry}/index.d.ts`,
      out: path.resolve(__dirname, `../types/${env.entry}.d.ts`),
      externals: false,
      outputAsModuleFolder: true,
      removeSource: true,
      preferRelative: true
    }),
  ],
});
