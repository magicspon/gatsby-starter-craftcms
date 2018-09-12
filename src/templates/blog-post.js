import React, { Component, Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import { relatedBlog } from '~/queries' // eslint-disable-line

export default class BlogPost extends Component {
	render() {
		const {
			data: {
				craft: { post }
			}
		} = this.props

		return (
			<Fragment>
				<pre>{JSON.stringify(post, null, 2)}</pre>
				<Link to="/">Back</Link>
			</Fragment>
		)
	}
}

export const pageQuery = graphql`
	query BlogPostByUri($uri: String!) {
		craft {
			post: entry(uri: $uri) {
				...relatedBlog
			}
		}
	}
`
