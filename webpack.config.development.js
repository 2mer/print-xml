const path = require('path');

module.exports = {
	entry: './src/index.tsx',

	mode: 'development',

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 8080,
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/i,
				use: 'ts-loader',
				exclude: /node_modues/
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},

	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	},
};