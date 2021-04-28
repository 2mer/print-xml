const path = require('path');

module.exports = {
	entry: './src/index.tsx',

	mode: 'production',

	module: {
		rules: [
			{
				test: /\.tsx?$/i,
				use: 'ts-loader',
				exclude: /node_modues/
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