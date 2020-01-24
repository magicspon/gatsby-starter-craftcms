import React from 'react'
import { string, shape, arrayOf } from 'prop-types'
import Carousel from 'nuka-carousel'
import { motion } from 'framer-motion'
import AnimateEntrance from '@/utils/AnimateEntrance'
import * as A from '@/utils/transitions'
import { Heading, Text } from '@/utils/Text'
import Image from '@/utils/Image'
import * as T from '@/types'

const AnimateHeading = motion.custom(Heading)
const AnimateText = motion.custom(Text)

function ForSchoolsResources({ heading, text, images }) {
	return (
		<AnimateEntrance className="wrapper">
			<div className="w-11/12 mx-auto lg:w-7/12">
				<AnimateHeading
					variants={A.textVariants}
					as="h3"
					className="mb-8 text-center "
				>
					{heading}
				</AnimateHeading>
				<AnimateText
					variants={A.textVariants}
					className="mx-auto mb-8 text-center md:w-10/12 lg:w-8/12 lg:mb-16"
				>
					{text}
				</AnimateText>
			</div>

			<Carousel
				cellAlign="center"
				cellSpacing={20}
				withoutControls
				frameOverflow="visible"
			>
				{images.map(image => (
					<motion.div variants={A.imageVariants} key={image.id} className="max-w-xs mx-auto">
						<Image {...image} />
					</motion.div>
				))}
			</Carousel>
		</AnimateEntrance>
	)
}

ForSchoolsResources.propTypes = {
	heading: string.isRequired,
	text: string.isRequired,
	images: arrayOf(
		shape(T.craftImage)
	).isRequired
}

export default ForSchoolsResources
