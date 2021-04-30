const path = require('path');

module.exports = {
	entry: './src/externalIndex.ts',

	mode: 'production',
	devtool: 'source-map',

	module: {
		rules: [
			{
				test: /\.tsx?$/i,
				loader: 'awesome-typescript-loader',
				// use: 'ts-loader',
				exclude: /node_modues/
			},
		],
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},

	externals: [
		"react",
		"react-dom",
	],

	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	},
};