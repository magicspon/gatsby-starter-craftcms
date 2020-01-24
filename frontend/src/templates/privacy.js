// import React from 'react'
// import { string, arrayOf, shape } from 'prop-types'
// import { graphql } from 'gatsby'
// import SEOMatic from '@/components/SEOMatic'
// import * as T from '@/types'
// import { cleanData } from '@/utils'
// import useConstant from '@/hooks/useConstant'
// import Legal from '@/components/Legal'

// function Privacy({ data }) {
// 	const { seo, heading, faq, text } = useConstant(() => cleanData(data))

// 	return (
// 		<>
// 			<SEOMatic {...seo} />

// 			<Legal heading={heading} text={text} faq={faq} />
// 		</>
// 	)
// }

// Privacy.propTypes = {
// 	data: shape({
// 		craft: shape({
// 			entries: arrayOf(
// 				shape({
// 					id: string.isRequired,
// 					title: string.isRequired,
// 					heading: string.isRequired,
// 					faq: T.craftFaqBlock.isRequired,
// 					headingText: T.craftHeadingText.isRequired
// 				})
// 			),
// 			seo: shape(T.craftSEOMatic)
// 		})
// 	})
// }

// export const query = graphql`
// 	{
// 		craft {
// 			entries(slug: "privacy") {
// 				id
// 				... on Craft_privacy_privacy_Entry {
// 					id
// 					title
// 					text
// 					faq {
// 						...faqQuery
// 					}
// 					heading
// 					headingText {
// 						...headingTextQuery
// 					}
// 				}
// 				title
// 			}

// 			seomatic(uri: "/privacy/", asArray: true) {
// 				...seoQuery
// 			}
// 		}
// 	}
// `

// export default Privacy
