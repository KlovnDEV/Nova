const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CssNano = require('cssnano');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD config
  output: {
    publicPath: '/html/',
  },
  devtool: 'inline-source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
        minify: true,
        sourcemap: false
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessor: CssNano,
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      }),
    ],
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

module.exports = new Promise(resolve => {
  resolve(buildWebpackConfig);
});
