/* eslint-disable no-param-reassign */

const path = require('path')
const webpack = require('webpack')
const hash = require('string-hash')
// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
	const isProduction = mode
	// const src = path.resolve(__dirname, '../src')
	const { rules } = config.module

	// Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
	config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]

	// use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
	config.module.rules[0].use[0].loader = require.resolve('babel-loader')

	// use @babel/preset-react for JSX and env (instead of staged presets)
	config.module.rules[0].use[0].options.presets = [
		require.resolve('@babel/preset-react'),
		require.resolve('@babel/preset-env')
	]

	/*
	config.module.rules[0].use[0].options.plugins = [
		require.resolve('@babel/plugin-proposal-class-properties'),
		require.resolve('babel-plugin-remove-graphql-queries')
	]
	*/

	config.module.rules = rules
		.filter(f => f.test.toString() !== '/\\.css$/')
		.filter(f => f.test.toString() !== '/\\.module\\.css$/')
		.map(f => {
			if (f.test.toString().includes('svg')) {
				return {
					...f,
					exclude: /icons/
				}
			}

			return f
		})

	config.module.rules.push(
		{
			test: /\.css$/,
			exclude: /\.module\.css$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1
						// localIdentName: 'mod-[hash:base64:8]'
					}
				},
				'postcss-loader'
			],
			include: path.resolve(__dirname, '../src')
		},

		{
			test: /\.module\.css$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
						modules: true
					}
				},
				'postcss-loader'
			],
			include: path.resolve(__dirname, '../src')
		},

		{
			test: /\.svg$/,
			include: path.resolve(__dirname, '../src/icons'),
			use: ({ resource }) => [
				{
					loader: ['svg-react-loader'],
					options: {
						jsx: true,
						svgo: {
							plugins: [
								{
									cleanupIDs: {
										prefix: `svg${hash(path.relative(__dirname, resource))}`
									}
								}
							]
						}
					}
				}
			]
		}
	)

	config.resolve.alias['@'] = path.resolve(__dirname, '../src/')
	config.resolve.mainFields = ['browser', 'module', 'main']

	return config
}
