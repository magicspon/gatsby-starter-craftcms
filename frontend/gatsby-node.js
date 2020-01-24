/* eslint-disable compat/compat */
const path = require(`path`)
const webpack = require('webpack')
const glob = require('glob')
const hash = require('string-hash')
const merge = require('webpack-merge')
const PurgeCssPlugin = require('purgecss-webpack-plugin')

require('dotenv').config({
	path: `.env`
})

const purgeConfig = {
	paths: glob.sync(path.join(__dirname, '/src/**/**/**/*.js'), {
		nodir: true
	}),
	extractors: [
		{
			extractor: class {
				static extract(content) {
					return content.match(/[A-Za-z0-9-_:/]+/g) || []
				}
			},
			extensions: ['js']
		}
	],
	whitelist: [''],
	whitelistPatterns: [/headroom/, /module--/, /ReactModal/, /nprogress/],
	whitelistPatternsChildren: [/nprogress/]
}

exports.onCreateWebpackConfig = ({ actions, stage, getConfig, rules }) => {
	const prevConfig = getConfig()
	const imgsRule = rules.images()

	prevConfig.module.rules = [
		// Remove the base url-loader images rule entirely
		...prevConfig.module.rules.filter(rule => {
			if (rule.test) {
				return rule.test.toString() !== imgsRule.test.toString()
			}
			return true
		}),
		// Put it back without SVG loading
		{
			...imgsRule,
			test: new RegExp(
				imgsRule.test
					.toString()
					.replace('svg|', '')
					.slice(1, -1)
			)
		}
	]

	actions.replaceWebpackConfig(
		merge(prevConfig, {
			output: {
				globalObject: 'this' // required for webworkers
			},

			resolve: {
				alias: {
					'@': path.resolve(__dirname, 'src')
				},
				mainFields: ['browser', 'module', 'main']
			},

			module: {
				rules: [
					{
						test: /\.(ttf|woff|woff2|eot)$/,
						use: 'file-loader?name=[name].[ext]',
						exclude: /icons/,
						include: path.resolve(__dirname, 'static')
					},
					{
						test: /\.svg$/,
						include: path.resolve(__dirname, 'src/icons'),
						use: ({ resource }) => [
							{
								loader: ['svg-react-loader'],
								options: {
									jsx: true,
									svgo: {
										plugins: [
											{
												cleanupIDs: {
													prefix: `svg${hash(
														path.relative(__dirname, resource)
													)}`
												}
											}
										]
									}
								}
							}
						]
					}
				]
			}
			// plugins: [
			// 	new webpack.DefinePlugin({
			// 		CMS_URL: JSON.stringify(process.env.CMS_URL),
			// 	})
			// ]
		})
	)

	// Add PurgeCSS in production
	if (stage.includes('build')) {
		actions.setWebpackConfig({
			plugins: [new PurgeCssPlugin(purgeConfig)]
		})
	}
}
