const { createHttpLink } = require('apollo-link-http')
const fetch = require('cross-fetch')
const store = require('store')
const sourceNodes = require('gatsby/dist/utils/source-nodes')
const { plugins } = require('./postcss.config')
require('dotenv').config()

module.exports = {
	siteMetadata: {
		title: 'Gatsby Craft'
	},
	plugins: [
		'gatsby-plugin-react-helmet-async',

		{
			resolve: 'gatsby-source-graphql',
			options: {
				typeName: 'Craft',
				fieldName: 'craft',

				createLink: () =>
					createHttpLink({
						uri: `${process.env.CRAFT_GQL_URL}api`,
						headers: {
							Authorization: `Bearer ${process.env.CRAFT_GQL_TOKEN}`
						},
						fetch: (uri, options) => {
							const token = store.get('X-Craft-Token')
							return fetch(
								`${uri}${token !== undefined ? `?token=${token}` : ''}`,
								options
							).catch(err => {
								console.log(err)
							})
						}
					})
			}
		},

		{
			resolve: `gatsby-plugin-nprogress`,
			options: {
				color: `#345DEE`,
				showSpinner: false
			}
		},

		{
			resolve: 'gatsby-plugin-postcss',
			options: {
				postCssPlugins: plugins
			}
		}
	],

	developMiddleware: app => {
		app.use('*', (req, res, next) => {
			try {
				if (req.query.token) {
					store.set('X-Craft-Token', req.query.token)
					sourceNodes()
				}
				next()
			} catch (err) {
				console.log(err)
			}
		})
	}
}
