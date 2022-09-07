const Path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDev = process.argv.includes('development') || process.env.NODE_ENV === 'development';
const isWatch = process.argv.includes('--watch');

const PATHS = {
  src: Path.join(__dirname, '../src'),
  build: Path.join(__dirname, '../build'),
  dist: Path.join(__dirname, '../../html/'),
  assets: 'assets/',
};

const PLUGINS = [
  new Dotenv({
    path: isDev ? './.env' : './.env.prod',
  }),
  new webpack.DefinePlugin({
    DEVELOPMENT: isDev,
    DEVELOPMENT_WATCH: isWatch,
    ASSETS: '"assets"',
  }),
  new HtmlWebpackPlugin({
    template: `${PATHS.src}/index.html`,
    filename: `./index.html`,
  }),
];

if (isDev) {
  PLUGINS.push(
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  );
  PLUGINS.push(new ReactRefreshWebpackPlugin());
} else {
  if (!isWatch) {
    /*
    PLUGINS.push(
      new BundleAnalyzerPlugin({
        analyzerPort: 6898,
      }),
    );*/
  }
  PLUGINS.push(
    new MiniCssExtractPlugin({
      filename: ({ chunk }) => `${PATHS.assets}css/${chunk.name.replace('/js/', '/css/')}.css`,
    }),
  );
}

module.exports = {
  // BASE config
  mode: isDev || isWatch ? 'development' : 'production',
  externals: {
    paths: PATHS,
  },
  entry: { app: `${PATHS.src}/index.tsx` },
  output: {
    filename: `${PATHS.assets}js/[name].[contenthash:8].js`,
    chunkFilename: `${PATHS.assets}js/[name]-chunk.[contenthash:8].js`,
    path: PATHS.dist,
    publicPath: '',
    clean: true,
    assetModuleFilename: (module) => {
      const filename = module.filename.replace('src/', '');
      return filename;
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
          tsconfigRaw: require('../tsconfig.json')
        },
      },
      {
        test: /\.js$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx',
          target: 'es2015',
        },
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg(\?.*)?$/,
        type: 'asset/resource',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDev
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: (resourcePath, context) => {
                    return Path.relative(Path.dirname(resourcePath), context) + '/';
                  },
                },
              },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              sourceMap: true,
              modules: {
                mode: 'local',
                exportLocalsConvention: 'asIs',
                auto: resourcePath => resourcePath.endsWith('.local.scss'),
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                config: `${PATHS.build}/postcss.config.js`,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      '~v': `${PATHS.src}/views`,
      '~cmp': `${PATHS.src}/components`,
      '~m': `${PATHS.src}/modules`,
    },
    modules: ['node_modules', PATHS.src],
    extensions: ['*', '.js', '.jsx', '.scss', '.ts', '.tsx'],
  },
  plugins: PLUGINS,
};
