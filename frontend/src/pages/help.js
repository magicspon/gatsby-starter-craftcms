import React from 'react'
import { string, arrayOf, shape } from 'prop-types'
import { graphql } from 'gatsby'
import * as T from '@/types'
import SEOMatic from '@/components/SEOMatic'
import { cleanData } from '@/utils'
import useConstant from '@/hooks/useConstant'
import Questions from '@/components/Questions'
import { Heading } from '@/utils/Text'
import Box from '@/components/Box'
import FormEnquiry from '@/components/FormEnquiry'
import RichText from '@/utils/RichText'

function Help({ data }) {
	const {
		seo,
		heading,
		heading2,
		heading10,
		text,
		text2,
		faq
	} = useConstant(() => cleanData(data))

	return (
		<>
			<SEOMatic {...seo} />

			<div className="pt-20 mb-20 lg:pt-20 lg:mb-32 wrapper">
				<div className="lg:flex lg:justify-between">
					<div className="max-w-lg mb-12 lg:mb-0 lg:w-3/5">
						<Heading as="h1" scale="h2" className="mb-12">
							{heading}
						</Heading>
						<RichText markdown={text} />
					</div>

					<div className="lg:w-2/5">
						<Box className="border-2">
							<FormEnquiry message={text2} heading={heading10} />
						</Box>
					</div>
				</div>
			</div>
			<div className="mb-20 lg:mb-32">
				<Questions heading={heading2} faq={faq} />
			</div>
		</>
	)
}

Help.propTypes = {
	data: shape({
		craft: shape({
			entries: arrayOf(
				shape({
					title: string.isRequired,
					heading: string.isRequired,
					heading2: string.isRequired,
					heading10: string.isRequired,
					text: string.isRequired,
					text2: string.isRequired,
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
			entries(slug: "help") {
				id
				... on Craft_help_help_Entry {
					id
					faq {
						...faqQuery
					}
					heading
					heading2
					heading10
					text
					text2
					title
				}
			}

			seomatic(uri: "/help/", asArray: true) {
				...seoQuery
			}
		}
	}
`

export default Help
