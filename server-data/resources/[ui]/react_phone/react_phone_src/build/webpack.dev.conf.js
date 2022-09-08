const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const BaseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(BaseWebpackConfig, {
  // DEV config
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    publicPath: '/',
  },
  devServer: {
    contentBase: BaseWebpackConfig.externals.paths.dist,
    historyApiFallback: true,
    port: 9293,
    overlay: {
      warnings: true,
      errors: true,
    },
    open: true,
  },
  plugins: [
    new Webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    })
  ],
});

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
