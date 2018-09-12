import { graphql } from 'gatsby'

export const relatedBlog = graphql`
	fragment relatedBlog on Craft_Blog {
		title
		uri
		id
		postDate
		body {
			content
		}
	}
`
