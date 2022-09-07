const { merge } = require('webpack-merge');
const BaseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(BaseWebpackConfig, {
  // DEV config
  devtool: 'eval-cheap-module-source-map',
  output: {
    publicPath: '/',
  },
  devServer: {
    compress: true,
    contentBase: BaseWebpackConfig.externals.paths.dist,
    historyApiFallback: true,
    port: 9292,
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    open: true,
  },
});

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
