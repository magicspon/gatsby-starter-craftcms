import React from 'react'
import { string, arrayOf, shape } from 'prop-types'
import { graphql } from 'gatsby'
import * as T from '@/types'
import SEOMatic from '@/components/SEOMatic'
import { cleanData } from '@/utils'
import useConstant from '@/hooks/useConstant'
import Legal from '@/components/Legal'

function FAQ({ data }) {
	const { seo, heading, faq } = useConstant(() => cleanData(data))

	return (
		<>
			<SEOMatic {...seo} />
			<Legal heading={heading} faq={faq} />
		</>
	)
}

FAQ.propTypes = {
	data: shape({
		craft: shape({
			entries: arrayOf(
				shape({
					id: string.isRequired,
					title: string.isRequired,
					heading: string.isRequired,
					faq: T.craftFaqBlock.isRequired
				})
			),
			seo: shape(T.craftSEOMatic)
		})
	})
}

export const query = graphql`
	{
		craft {
			entries(slug: "faq") {
				id
				... on Craft_faq_faq_Entry {
					id
					faq {
						...faqQuery
					}
					heading
					title
				}
			}
			seomatic(uri: "/faq/", asArray: true) {
				...seoQuery
			}
		}
	}
`

export default FAQ
