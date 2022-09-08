const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BaseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(BaseWebpackConfig, {
	// DEV config
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: BaseWebpackConfig.externals.paths.dist,
		port: 8080,
		overlay: {
			warnings: true,
			errors: true,
		},
	},
	plugins: [
		new Webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
		}),
		new BrowserSyncPlugin(
			{
				host: 'localhost',
				port: 3000,
				proxy: 'http://localhost:8080/',
				notify: false,
			},
			{
				reload: false,
			},
		),
	],
});

module.exports = new Promise((resolve) => {
	resolve(devWebpackConfig);
});
