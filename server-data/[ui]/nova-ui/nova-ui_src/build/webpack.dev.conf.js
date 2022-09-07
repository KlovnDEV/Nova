const { merge } = require('webpack-merge');
const BaseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(BaseWebpackConfig, {
  // DEV config
  devtool: 'eval-cheap-module-source-map',
  output: {
    publicPath: '/',
  },
  devServer: {
    open: true,
    hot: true,
    compress: true,
    static: {
      directory: BaseWebpackConfig.externals.paths.dist,
    },
    historyApiFallback: true,
    port: 9292,
    client: {
      overlay: true,
    },
  },
});

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
