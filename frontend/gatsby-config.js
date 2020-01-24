const { plugins } = require('./postcss.config')
require('dotenv').config({
	path: `.env`
})

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
				url: `${process.env.CMS_URL}api`
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
	]
}
