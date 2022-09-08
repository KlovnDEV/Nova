const { merge } = require('webpack-merge');
const BaseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(BaseWebpackConfig, {
  // WATCH config
  mode: 'development',
  watchOptions: {
    ignored: '**/node_modules',
  },
  output: {
    publicPath: '/html/',
  },
  devtool: 'inline-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `vendor-${packageName.replace('@', '')}`;
          },
        },
        app: {
          name: 'app',
          enforce: true,
          maxSize: 249856,
          chunks: 'all',
        },
      },
    },
  },
});

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
