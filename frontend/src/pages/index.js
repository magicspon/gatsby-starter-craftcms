import React from 'react'
import { string, arrayOf, shape, bool } from 'prop-types'
import { graphql } from 'gatsby'
import * as T from '@/types'
import { cleanData } from '@/utils'
import useConstant from '@/hooks/useConstant'
import Button from '@/components/Button'
import Link from '@/utils/Link'
import IconWrapper from '@/utils/IconWrapper'
import ArrowIcon from '@/icons/arrow.svg'
import { Heading } from '@/utils/Text'
import SEOMatic from '@/components/SEOMatic'
import Image from '@/utils/Image'
function IndexPage({ data }) {
	const {
		seo,
		heading,
		video,
		videoEnabled,
		image: [image],
		button: [{ text: buttonText, link: buttonLink }]
	} = useConstant(() => cleanData(data))

	return (
		<>
			<SEOMatic {...seo} />

			<div className="flex flex-col justify-center w-full h-screen">
				{videoEnabled ? (
					<video
						src={video}
						muted
						autoPlay
						loop
						preload="auto"
						className="absolute inset-0 object-cover w-full h-full"
					/>
				) : (
					<div className="absolute inset-0 w-full h-full">
						<Image
							className="absolute inset-0 object-cover w-full h-full"
							{...image}
							style={{ height: '100%', position: 'absolute' }}
						/>
						<div className="absolute inset-0 bg-black-25" />
					</div>
				)}
				<div className="relative wrapper">
					<div className="max-w-4xl md:w-4/5">
						<Heading as="h1" className="mb-8 text-white lg:mb-20">
							{heading}
						</Heading>
						<Button to={buttonLink} as={Link}>
							{buttonText}
							<IconWrapper icon={ArrowIcon} className="w-4 ml-4 text-white" />
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}

IndexPage.propTypes = {
	data: shape({
		craft: shape({
			entries: arrayOf(
				shape({
					id: string.isRequired,
					title: string.isRequired,
					video: string.isRequired,
					videoEnabled: bool,
					image: arrayOf(shape(T.craftImage)),
					button: T.craftButton.isRequired,
					heading: string.isRequired
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
				id
				... on Craft_home_home_Entry {
					id
					title
					videoEnabled
					video
					button {
						link
						text
					}
					heading
					image {
						...imageQuery
					}
				}
			}
			seomatic(uri: "/", asArray: true) {
				...seoQuery
			}
		}
	}
`

export default IndexPage
