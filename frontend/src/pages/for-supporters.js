import React from 'react'
import { string, arrayOf, shape } from 'prop-types'
import { graphql } from 'gatsby'
import * as T from '@/types'
import SEOMatic from '@/components/SEOMatic'
import { cleanData } from '@/utils'
import useConstant from '@/hooks/useConstant'
import QuoteGrid from '@/components/QuoteGrid'
import Questions from '@/components/Questions'
import ForSupportersIntro from '@/components/cms/ForSupportersIntro'
import Products from '@/components/cms/Products'
import ForSupportersSchool from '@/components/cms/ForSupportersSchool'
import ForSupportersHowItWorks from '@/components/cms/ForSupportersHowItWorks'
import Banner from '@/components/Banner'
function ForSupports({ data }) {
	const {
		seo,
		heading,
		heading2,
		heading3,
		heading4,
		heading5,
		heading6,
		heading10,
		text,
		text2,
		text3,
		button: [{ text: buttonText, link: buttonLink }],
		button2: [{ text: buttonText2, link: buttonLink2 }],
		button3: [{ text: buttonText3, link: buttonLink3 }],
		button4: [{ text: buttonText4, link: buttonLink4 }],
		testimonials,
		headingText,
		image,
		image2,
		images,
		faq
	} = useConstant(() => cleanData(data))

	return (
		<>
			<SEOMatic {...seo} />

			<div className="pt-12 mb-20 lg:pt-20 lg:mb-32">
				<ForSupportersIntro
					heading={heading}
					text={text}
					button={{ text: buttonText, link: buttonLink }}
					images={images}
				/>
			</div>

			<div className="mb-20 lg:mb-32">
				<Products image={image[0]} heading={heading10} text={text2} />
			</div>

			<div className="w-full mb-20 overflow-hidden lg:mb-32">
				<QuoteGrid heading={heading2} testimonials={testimonials} />
			</div>

			<div className="mb-20 lg:mb-32">
				<ForSupportersSchool
					image={image2[0]}
					heading={heading3}
					text={text3}
					button={{ text: buttonText2, link: buttonLink2 }}
				/>
			</div>

			<div className="mb-20 lg:mb-32">
				<ForSupportersHowItWorks
					heading={heading4}
					items={headingText}
					button={{ link: buttonLink3, text: buttonText3 }}
				/>
			</div>

			<div className="lg:mb-32">
				<Questions heading={heading5} faq={faq} />
			</div>

			<div className="mb-20 lg:mb-32">
				<Banner
					heading={heading6}
					buttons={[{ link: buttonLink4, text: buttonText4 }]}
				/>
			</div>
		</>
	)
}

ForSupports.propTypes = {
	data: shape({
		craft: shape({
			entries: arrayOf(
				shape({
					id: string.isRequired,
					title: string.isRequired,
					heading: string.isRequired,
					heading2: string.isRequired,
					heading3: string.isRequired,
					heading4: string.isRequired,
					heading5: string.isRequired,
					heading6: string.isRequired,
					heading10: string.isRequired,
					text: string.isRequired,
					text2: string.isRequired,
					text3: string.isRequired,
					button: T.craftButton.isRequired,
					button2: T.craftButton.isRequired,
					button3: T.craftButton.isRequired,
					button4: T.craftButton.isRequired,
					testimonials: T.craftTestimonialBlock.isRequired,
					image: arrayOf(shape(T.craftImage)),
					image2: arrayOf(shape(T.craftImage)),
					images: arrayOf(shape(T.craftImage)),
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
			entries(slug: "for-supporters") {
				id
				... on Craft_forSupporters_forSupporters_Entry {
					id
					button {
						link
						text
					}
					button2 {
						link
						text
					}
					button3 {
						link
						text
					}
					button4 {
						link
						text
					}
					heading
					heading2
					heading3
					heading4
					heading5
					heading6
					heading10
					headingText {
						...headingTextQuery
					}
					sectionHandle
					text
					text2
					text3
					title
					testimonials {
						...quoteQuery
					}
					image {
						...imageQuery
					}
					image2 {
						...imageQuery
					}
					images {
						...imageQuery
					}
					faq {
						...faqQuery
					}
				}
			}

			seomatic(uri: "/for-supporters/", asArray: true) {
				...seoQuery
			}
		}
	}
`

export default ForSupports
