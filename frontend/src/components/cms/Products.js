import React from 'react'
import { string, shape } from 'prop-types'
import { motion } from 'framer-motion'
import AnimateEntrance from '@/utils/AnimateEntrance'
import * as A from '@/utils/transitions'
import { Heading, Text } from '@/utils/Text'
import Image from '@/utils/Image'
import * as T from '@/types'


const AnimateHeading = motion.custom(Heading)
const AnimateText = motion.custom(Text)


function Products({ heading, text, image}) {
	return (
		<AnimateEntrance className="wrapper">
			<div className="mb-10 lg:flex lg:justify-between md:mb-16">
				<AnimateHeading
					variants={A.textVariants}
					as="h2"
					className="w-full pb-4 md:w-8/12 lg:w-6/12 md:pb-10 lg:pb-0"
				>
					{heading}
				</AnimateHeading>
				<AnimateText
					variants={A.textVariants}
					className="w-full md:w-8/12 lg:w-5/12"
				>
					{text}
				</AnimateText>
			</div>
			<motion.div
				variants={A.imageVariants}
			>
				<Image {...image} />
			</motion.div>
		</AnimateEntrance>
	)
}

Products.propTypes = {
	heading: string.isRequired,
	text: string.isRequired,
	image: shape(T.craftImage).isRequired
}

export default Products
