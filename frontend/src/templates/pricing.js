// import React from 'react'
// import { string, arrayOf, shape } from 'prop-types'
// import { graphql } from 'gatsby'
// import * as T from '@/types'
// import SEOMatic from '@/components/SEOMatic'
// import { cleanData } from '@/utils'
// import useConstant from '@/hooks/useConstant'
// import Button from '@/components/Button'
// import Box from '@/components/Box'
// import Link from '@/utils/Link'
// import { Heading, Text } from '@/utils/Text'
// import IconWrapper from '@/utils/IconWrapper'
// import TickIcon from '@/icons/tick.svg'

// function Pricing({ data }) {
// 	const {
// 		seo,
// 		heading,
// 		heading2,
// 		heading10,
// 		text,
// 		text2,
// 		list,
// 		list2,
// 		button: [{ text: buttonText, link: buttonLink }]
// 	} = useConstant(() => cleanData(data))

// 	return (
// 		<>
// 			<SEOMatic {...seo} />
// 			<div className="pt-12 mb-20 wrapper">
// 				<Heading as="h1" className="mb-12">
// 					{heading}
// 				</Heading>
// 				<div className="lg:flex lg:-ml-8">
// 					<div className="lg:pl-8 lg:w-3/4">
// 						<Box custom className="px-4 py-6 mb-6 border-2 lg:p-8 lg:mb-0">
// 							<h2 className="mb-2 text-md font-sans-semi">{heading10}</h2>
// 							<Text className="mb-6">{text}</Text>
// 							<ul className="mb-10 col-count-2 lg:mb-4">
// 								{list.map(({ item }) => (
// 									<li
// 										key={item}
// 										className="flex flex-no-wrap items-baseline mb-4 text-sm leading-tight"
// 									>
// 										<IconWrapper
// 											icon={TickIcon}
// 											className="flex-shrink-0 w-4 mr-2"
// 										/>
// 										{item}
// 									</li>
// 								))}
// 							</ul>

// 							<Button className="w-full max-w-xs" as={Link} to={buttonLink}>
// 								{buttonText}
// 							</Button>
// 						</Box>
// 					</div>
// 					<div className="lg:pl-8 lg:w-1/4">
// 						<Box
// 							custom
// 							className="h-full px-4 py-6 mb-12 bg-gray-100 lg:mb-0 lg:p-8"
// 						>
// 							<h2 className="mb-2 text-md font-sans-semi">{heading2}</h2>
// 							<Text className="mb-6">{text2}</Text>
// 							<ul>
// 								{list2.map(({ item }) => (
// 									<li
// 										key={item}
// 										className="flex flex-no-wrap items-baseline mb-4 text-sm leading-tight"
// 									>
// 										<IconWrapper
// 											icon={TickIcon}
// 											className="flex-shrink-0 w-4 mr-2"
// 										/>
// 										{item}
// 									</li>
// 								))}
// 							</ul>
// 						</Box>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	)
// }

// Pricing.propTypes = {
// 	data: shape({
// 		craft: shape({
// 			entries: arrayOf(
// 				shape({
// 					id: string.isRequired,
// 					title: string.isRequired,
// 					heading: string.isRequired,
// 					heading2: string.isRequired,
// 					heading10: string.isRequired,
// 					text: string.isRequired,
// 					text2: string.isRequired,
// 					button: T.craftButton.isRequired,
// 					list: T.craftList.isRequired,
// 					list2: T.craftList.isRequired
// 				})
// 			),
// 			seo: shape(T.craftSEOMatic)
// 		})
// 	})
// }

// export const query = graphql`
// 	{
// 		craft {
// 			entries(slug: "pricing") {
// 				id
// 				... on Craft_pricing_pricing_Entry {
// 					id
// 					button {
// 						link
// 						text
// 					}
// 					heading
// 					heading10
// 					heading2
// 					list {
// 						item
// 					}
// 					list2 {
// 						item
// 					}
// 					text
// 					text2
// 					title
// 				}
// 			}

// 			seomatic(uri: "/pricing/", asArray: true) {
// 				...seoQuery
// 			}
// 		}
// 	}
// `

// export default Pricing
