import React, { useRef } from 'react'
import { string, arrayOf, shape } from 'prop-types'
import { graphql } from 'gatsby'
import { map, split, compose } from 'ramda'
import SEOMatic from '@/components/SEOMatic'
import * as T from '@/types'
import { cleanData } from '@/utils'
import useConstant from '@/hooks/useConstant'
import { Heading } from '@/utils/Text'
import Box from '@/components/Box'
import FormEnquiry from '@/components/FormEnquiry'
import useGoogleMaps from '@/hooks/useGoogleMaps'
import RichText from '@/utils/RichText'
import mapStyles from '@/utils/mapStyles'

function Contact({ data }) {
	const {
		seo,
		heading,
		heading10,
		text,
		text2,
		text3,
		mapLatLng
	} = useConstant(() => cleanData(data))
	const mapRef = useRef()
	const [lat, lng] = compose(map(parseFloat), split(','))(mapLatLng)

	useGoogleMaps(
		mapRef,
		{
			key: GOOGLE_API_KEY
		},
		{
			center: { lat, lng },
			zoom: 16,
			disableDefaultUI: true,
			styles: mapStyles
		}
	)

	return (
		<>
			<SEOMatic {...seo} />

			<div className="py-12 wrapper">
				<Heading as="h1" scale="h3" className="mb-12">
					{heading}
				</Heading>
				<div className="lg:flex">
					<div className="mb-12 lg:mb-0 lg:w-3/5 lg:pr-12">
						<div className="mb-8 md:flex">
							<div className="mb-6 md:w-1/2">
								<RichText className="whitespace-pre-line" markdown={text} />
							</div>
							<div className="md:w-1/2">
								<RichText className="whitespace-pre-line" markdown={text2} />
							</div>
						</div>
						<div className="relative aspect-ratio-square lg:aspect-ratio-4/3">
							<div ref={mapRef} className="absolute inset-0" />
						</div>
					</div>

					<div className="lg:w-2/5">
						<Box className="border-2">
							<FormEnquiry message={text3} heading={heading10} />
						</Box>
					</div>
				</div>
			</div>
		</>
	)
}

Contact.propTypes = {
	data: shape({
		craft: shape({
			entries: arrayOf(
				shape({
					id: string.isRequired,
					title: string.isRequired,
					heading: string.isRequired,
					heading10: string.isRequired,
					text: string.isRequired,
					text2: string.isRequired,
					text3: string.isRequired,
					mapLatLng: string.isRequired
				})
			),
			seo: shape(T.craftSEOMatic)
		})
	})
}

export const query = graphql`
	{
		craft {
			entries(slug: "contact") {
				id
				... on Craft_contact_contact_Entry {
					id
					title
					heading
					heading10
					text
					text2
					text3
					mapLatLng
				}
			}

			seomatic(uri: "/contact/", asArray: true) {
				...seoQuery
			}
		}
	}
`

export default Contact
