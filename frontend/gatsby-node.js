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
	whitelistPatterns: [
		/headroom/,
		/module--/,
		/ReactModal/,
		/nprogress/,
		/slide-visible/
	],
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
			},
			plugins: [
				new webpack.DefinePlugin({
					API_URL: JSON.stringify(process.env.API_URL),
					STRIPE_API_KEY: JSON.stringify(process.env.STRIPE_API_KEY),
					GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
					SITE_URL: JSON.stringify(process.env.SITE_URL)
				})
			]
		})
	)

	// Add PurgeCSS in production
	// See: https://github.com/gatsbyjs/gatsby/issues/5778#issuecomment-402481270
	if (stage.includes('build')) {
		actions.setWebpackConfig({
			plugins: [new PurgeCssPlugin(purgeConfig)]
		})
	}
}
