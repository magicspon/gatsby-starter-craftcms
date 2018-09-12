const config = require('./src/site.config')

module.exports = {
	siteMetadata: {
		...config
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-postcss',
		{
			resolve: 'gatsby-plugin-layout',
			options: {
				component: require.resolve('./src/wrapper/layout.js')
			}
		},
		{
			resolve: 'gatsby-plugin-emotion',
			options: {
				// Accepts all options defined by `babel-plugin-emotion` plugin.
				autoLabel: true
			}
		},
		{
			resolve: 'gatsby-source-graphql',
			options: {
				fieldName: 'craft',
				typeName: 'Craft',
				url: 'https://yourdomain/api',
				headers: {
					Authorization: 'bearer XXXXX'
				}
			}
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: config.manifest
		},
		'gatsby-plugin-offline'
	]
}
