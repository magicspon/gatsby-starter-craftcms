# Gatsby Starter Craftcms

Use Craftcms as a headless cms. Pull data into Gatsby via craftql that exposes the craft api as a grapql layer. Lovely stuff

## Features

- Craftcms as a backend ([Craft CMS | Focused content management for web professionals](https://craftcms.com/))
- Tailwind ([Tailwind CSS - A Utility-First CSS Framework for Rapid UI Development](https://tailwindcss.com/))
- Page transitions with Pose ([Pose | A truly simple animation library for React, React Native, and Vue](https://popmotion.io/pose/))
- CSS in JS via emotion ([emotion](https://emotion.sh))
- Remove unused CSS with purgecss ([Introduction - Purgecss](https://www.purgecss.com/))
- Rematch store ([Getting Started · Rematch](https://rematch.gitbooks.io/rematch/#getting-started))
- Offline ([gatsby-plugin-offline | GatsbyJS](https://www.gatsbyjs.org/packages/gatsby-plugin-offline/?=))
- Manifest [gatsby/packages/gatsby-plugin-manifest at master · gatsbyjs/gatsby · GitHub](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-manifest)
- Fork of gatsby-image to work with craft-imageoptimizer [GitHub - nystudio107/craft-imageoptimize: Automatically create & optimize responsive image transforms, using either native Craft transforms or a service like Imgix, with zero template changes.](https://github.com/nystudio107/craft-imageoptimize)
- Sitemap (integrated with Craftcms)
- SVG Symbols
- ESLint (Airbnb style, prettier, jsx-a11y)

## Getting Started

Install craft
[Installation Instructions | Craft 3 Documentation](https://docs.craftcms.com/v3/installation.html)

Install craftql
[GitHub - markhuot/craftql: A drop-in GraphQL server for Craft CMS](https://github.com/markhuot/craftql)

Once the helloWorld query works in craft, you’re in business

For the example code to work you’ll need to create a channel called blog, and add a few entries, they only need titles for now.

## Gatsby

`npm install`

Open gatsby-config.js

You’ll need to add url for the craftql endpoint, and the bearer token:

```javascript
{
	resolve: 'gatsby-source-graphql',
	options: {
		fieldName: 'craft',
		typeName: 'Craft',
		url: 'https://yourdomain/api',
		headers: {
			Authorization:
				'bearer XXXX'
		}
	}
},
```

`npm start`

You can now go to https://localhost:8000 and https://localhost:8000/___graphql

Go to the graphql explorer at https://localhost:8000/___graphql

Have a play. All of the Types are prefixed with `Craft_`

For example

```graphql
{
	craft {
		entries(section: [blog]) {
			... on Craft_Blog {
				title
				uri
				postDate
			}
		}
	}
}
```

And that’s the weather…

Enjoy.
