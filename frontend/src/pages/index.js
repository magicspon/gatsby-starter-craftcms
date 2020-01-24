import React from 'react'
import { string, arrayOf, shape, bool } from 'prop-types'
import { graphql } from 'gatsby'
import * as T from '@/types'
import { cleanData } from '@/utils'
import useConstant from '@/hooks/useConstant'
import SEOMatic from '@/components/SEOMatic'
function IndexPage({ data }) {
	const { seo, id } = useConstant(() => cleanData(data))

	return (
		<>
			<SEOMatic {...seo} />

			<pre>{JSON.stringify(id, null, 2)}</pre>
		</>
	)
}

IndexPage.propTypes = {
	data: shape({
		craft: shape({
			entries: arrayOf(
				shape({
					id: string.isRequired
				})
			),
			seo: shape(T.craftSEOMatic)
		})
	})
}

export const query = graphql`
	{
		craft {
			entries(slug: "home") {
				... on Craft_home_home_Entry {
					id
				}
			}
			seomatic(uri: "/", asArray: true) {
				...seoQuery
			}
		}
	}
`

export default IndexPage
