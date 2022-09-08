const Path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    template: `${PATHS.src}/views/pages/index.html`,
    filename: `./index.html`,
  }),
  new CopyWebpackPlugin({
    patterns: [
      { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
      {
        from: `${PATHS.src}/${PATHS.assets}audio`,
        to: `${PATHS.assets}audio`,
      },
    ],
  }),
  new webpack.ProvidePlugin({
    $: [`${PATHS.src}/utils/Utils.ts`, 'ConcatClasses'],
  }),
];

if (isDev) {
  PLUGINS.push(
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  );
} else {
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
        test: /\.(ts|tsx?)$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
          tsconfigRaw: require('../tsconfig.json')
        },
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx',
          target: 'es2015',
        },
      },
      {
        test: /\.(woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(mp3|ogg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
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
    ],
  },
  resolve: {
    alias: {
      '~s': PATHS.src,
      '~v': `${PATHS.src}/views`,
      '~u': `${PATHS.src}/utils`,
      '~cmp': `${PATHS.src}/views/components`,
      '~m': `${PATHS.src}/modules`,
      '~ui': `${PATHS.src}/libs/UI`,
      '~l': `${PATHS.src}/libs/`,
      '~a': `${PATHS.src}/apps/`,
    },
    modules: ['node_modules', PATHS.src],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: PLUGINS,
};
