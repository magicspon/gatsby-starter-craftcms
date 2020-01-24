import React from 'react'
import { string, arrayOf, shape, bool } from 'prop-types'
import { graphql } from 'gatsby'
import * as T from '@/types'
import { cleanData } from '@/utils'
import useConstant from '@/hooks/useConstant'
// import SEOMatic from '@/components/SEOMatic'
function IndexPage({ data }) {
	const { id, previewTitle, previewDescription } = useConstant(() =>
		cleanData(data)
	)

	return (
		<div className="py-64">
			<h1>{previewTitle}</h1>
		</div>
	)
}

IndexPage.propTypes = {
	data: shape({
		craft: shape({
			entries: arrayOf(
				shape({
					id: string.isRequired
				})
			)
		})
	})
}

export const query = graphql`
	{
		craft {
			entries(slug: "home") {
				... on Craft_home_home_Entry {
					id
					previewTitle
					previewDescription

					previewImage {
						...optimisedHero
					}
				}
			}
		}
	}
`

export default IndexPage
