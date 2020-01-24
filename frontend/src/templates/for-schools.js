// import React from 'react'
// import { string, arrayOf, shape, bool } from 'prop-types'
// import { graphql } from 'gatsby'
// import * as T from '@/types'
// import { cleanData } from '@/utils'
// import SEOMatic from '@/components/SEOMatic'
// import useConstant from '@/hooks/useConstant'
// import QuoteGrid from '@/components/QuoteGrid'
// import Questions from '@/components/Questions'
// import ForSchoolsIntro from '@/components/cms/ForSchoolsIntro'
// import ForSchoolsStressFree from '@/components/cms/ForSchoolsStressFree'
// import Products from '@/components/cms/Products'
// import ForSchoolsLargeImage from '@/components/cms/ForSchoolsLargeImage'
// import ForSchoolsHowItWorks from '@/components/cms/ForSchoolsHowItWorks'
// import ForSchoolsResources from '@/components/cms/ForSchoolsResources'
// import ForSchoolsTestimonials from '@/components/cms/ForSchoolsTestimonials'
// import Banner from '@/components/Banner'

// function ForSchools({ data }) {
// 	const {
// 		seo,
// 		heading,
// 		text,
// 		button: [{ text: buttonText, link: buttonLink }],
// 		heading2,
// 		button2: [{ text: buttonText2, link: buttonLink2 }],
// 		text2,
// 		heading3,
// 		text3,
//		testimonialsEnabled,
// 		testimonials,
// 		button3: [{ text: buttonText3, link: buttonLink3 }],
// 		heading4,
// 		text4,
// 		button4: [{ text: buttonText4, link: buttonLink4 }],
// 		heading5,
// 		imageHeadingText,
// 		heading6,
// 		text5,
// 		button5: [{ text: buttonText5, link: buttonLink5 }],
// 		heading7,
// 		faq,
// 		// subheading,
// 		subheading2,
// 		heading8,
// 		testimonials2,
// 		heading9,
// 		heading10,
// 		image,
// 		image2,
// 		image3,
// 		image4,
// 		image5,
// 		// images,
// 		images2
// 	} = useConstant(() => cleanData(data))

// 	return (
// 		<>
// 			<SEOMatic {...seo} />
// 			<div className="pt-12 lg:pt-20 xl:pt-32">
// 				<ForSchoolsIntro
// 					heading={heading}
// 					text={text}
// 					button={{ text: buttonText, link: buttonLink }}
// 					phoneImage={image[0]}
// 					tabletImage={image5[0]}
// 				/>
// 			</div>
// 			<div className="mb-20 lg:mb-32">
// 				<ForSchoolsStressFree
// 					heading={heading2}
// 					text={text2}
// 					button={{ text: buttonText2, link: buttonLink2 }}
// 					image={image2[0]}
// 				/>
// 			</div>

// 			<div className="mb-20 lg:mb-32">
// 				<Products image={image3[0]} heading={heading3} text={text3} />
// 			</div>
//			{testimonialsEnabled && (
//	 			<div className="w-full pb-20 overflow-hidden">
//	 				<QuoteGrid heading={heading10} testimonials={testimonials} />
//	 			</div>
// 			)}

// 			<div className="mb-20 lg:mb-32">
// 				<ForSchoolsLargeImage
// 					image={image4[0]}
// 					heading={heading4}
// 					text={text4}
// 				/>
// 			</div>

// 			<div className="mb-20 lg:mb-32">
// 				<ForSchoolsHowItWorks
// 					heading={heading5}
// 					items={imageHeadingText}
// 					button={{ link: buttonLink3, text: buttonText3 }}
// 				/>
// 			</div>
// 			<div className="mb-20 lg:mb-32">
// 				<ForSchoolsResources heading={heading6} text={text5} images={images2} />
// 			</div>

// 			<div className="mb-20 lg:mb-32">
// 				<Questions heading={heading7} faq={faq} />
// 			</div>

// 			<div className="mb-20 lg:mb-32">
// 				<ForSchoolsTestimonials
// 					heading={heading8}
// 					subheading={subheading2}
// 					testimonials={testimonials2}
// 				/>
// 			</div>

// 			<div className="mb-20">
// 				<Banner
// 					heading={heading9}
// 					buttons={[
// 						{ link: buttonLink4, text: buttonText4 },
// 						{ link: buttonLink5, text: buttonText5 }
// 					]}
// 				/>
// 			</div>
// 		</>
// 	)
// }

// ForSchools.propTypes = {
// 	data: shape({
// 		craft: shape({
// 			entries: arrayOf(
// 				shape({
// 					id: string.isRequired,
// 					title: string.isRequired,
// 					heading: string.isRequired,
// 					heading2: string.isRequired,
// 					heading3: string.isRequired,
// 					heading4: string.isRequired,
// 					heading5: string.isRequired,
// 					heading6: string.isRequired,
// 					heading7: string.isRequired,
// 					heading8: string.isRequired,
// 					heading9: string.isRequired,
// 					heading10: string.isRequired,
// 					subheading: string.isRequired,
// 					subheading2: string.isRequired,
// 					text: string.isRequired,
// 					text2: string.isRequired,
// 					text3: string.isRequired,
// 					text4: string.isRequired,
// 					text5: string.isRequired,
// 					button: T.craftButton.isRequired,
// 					button2: T.craftButton.isRequired,
// 					button3: T.craftButton.isRequired,
// 					button4: T.craftButton.isRequired,
// 					button5: T.craftButton.isRequired,
// 					testimonials: T.craftTestimonialBlock.isRequired,
// 					testimonials2: T.craftTestimonialBlock.isRequired,
// 					faq: T.craftFaqBlock.isRequired,
// 					schoolsEnabled: bool.isRequried,
// 					testimonialsEnabled: bool.isRequired,
// 					image: arrayOf(shape(T.craftImage)),
// 					image2: arrayOf(shape(T.craftImage)),
// 					image3: arrayOf(shape(T.craftImage)),
// 					image4: arrayOf(shape(T.craftImage)),
// 					image5: arrayOf(shape(T.craftImage)),
// 					images: arrayOf(shape(T.craftImage)),
// 					images2: arrayOf(shape(T.craftImage))
// 				})
// 			),
// 			seo: shape(T.craftSEOMatic)
// 		})
// 	})
// }

// export const query = graphql`
// 	{
// 		craft {
// 			entries(slug: "for-schools") {
// 				id
// 				... on Craft_forSchools_forSchools_Entry {
// 					id
// 					heading
// 					heading2
// 					heading3
// 					heading4
// 					heading5
// 					heading6
// 					heading7
// 					heading8
// 					heading9
// 					heading10
// 					button {
// 						text
// 						link
// 					}
// 					button2 {
// 						text
// 						link
// 					}
// 					button3 {
// 						text
// 						link
// 					}
// 					button4 {
// 						link
// 						text
// 					}
// 					button5 {
// 						link
// 						text
// 					}
// 					title
// 					text
// 					text2
// 					text3
// 					text4
// 					text5
// 					subheading
// 					subheading2
// 					schoolsEnabled
// 					testimonialsEnabled
// 					testimonials {
// 						...quoteQuery
// 					}
// 					testimonials2 {
// 						...quoteQuery2
// 					}
// 					imageHeadingText {
// 						...imageHeadingQuery
// 					}
// 					faq {
// 						...faqQuery
// 					}
// 					image {
// 						...imageQuery
// 					}
// 					image2 {
// 						...imageQuery
// 					}
// 					image3 {
// 						...imageQuery
// 					}
// 					image4 {
// 						...imageQuery
// 					}
// 					image5 {
// 						...imageQuery
// 					}
// 					images {
// 						...imageQuery
// 					}
// 					images2 {
// 						...imageQuery
// 					}
// 				}
// 			}
// 			seomatic(uri: "/for-schools/", asArray: true) {
// 				...seoQuery
// 			}
// 		}
// 	}
// `

// export default ForSchools
