const path = require('path');
// const Reload = require('webpack-livereload-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	plugins: [
		// new Reload(),
		// new CleanWebpackPlugin(['../public/scripts']),
		// new HtmlWebpackPlugin({
		// 	title: 'caching'
		// })
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../public/scripts'),
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: [':data-src'],
					},
				},
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						useRelativePath: true,
					},
				},
			},
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					query: {
						presets: ['stage-2'],
					},
				},
				exclude: /node_modules/,
			},
			{
				test: /\.(scss|css)$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
};
