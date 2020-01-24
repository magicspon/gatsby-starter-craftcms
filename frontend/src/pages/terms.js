import React from 'react'
import { string, arrayOf, shape } from 'prop-types'
import { graphql } from 'gatsby'
import SEOMatic from '@/components/SEOMatic'
import * as T from '@/types'
import { cleanData } from '@/utils'
import useConstant from '@/hooks/useConstant'
import Legal from '@/components/Legal'

function Terms({ data }) {
	const { seo, heading, faq } = useConstant(() => cleanData(data))

	return (
		<>
			<SEOMatic {...seo} />
			<Legal heading={heading} faq={faq} />
		</>
	)
}

Terms.propTypes = {
	data: shape({
		craft: shape({
			entries: arrayOf(
				shape({
					id: string.isRequired,
					title: string.isRequired,
					heading: string.isRequired,
					faq: T.craftFaqBlock.isRequired,
					headingText: T.craftHeadingText.isRequired
				})
			),
			seo: shape(T.craftSEOMatic)
		})
	})
}

export const query = graphql`
	{
		craft {
			entries(slug: "terms") {
				id
				... on Craft_terms_terms_Entry {
					id
					faq {
						...faqQuery
					}
					heading
					headingText {
						...headingTextQuery
					}
					title
				}
				title
			}

			seomatic(uri: "/terms/", asArray: true) {
				...seoQuery
			}
		}
	}
`

export default Terms
