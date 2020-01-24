import React from 'react'
import { string, shape } from 'prop-types'
import { motion } from 'framer-motion'
import AnimateEntrance from '@/utils/AnimateEntrance'
import * as A from '@/utils/transitions'
import { Heading, Text } from '@/utils/Text'
import * as T from '@/types'
import Image from '@/utils/Image'

const AnimateHeading = motion.custom(Heading)
const AnimateText = motion.custom(Text)
function ForSchoolsLargeImage({ heading, text, image }) {
	return (
		<AnimateEntrance className="relative w-full mx-auto max-w-wrapper">
			<motion.div
				variants={A.imageVariants}
				className="absolute inset-0 object-cover w-full h-full"
			>
				<Image {...image} style={{ height: '100%'}} />
			</motion.div>
			<div className="relative z-10 pt-12 pb-64 text-center wrapper lg:pt-20">
				<div className="max-w-3xl mx-auto">
					<AnimateHeading
						variants={A.textVariants}
						as="h3"
						className="mb-6 text-white"
					>
						{heading}
					</AnimateHeading>
					<div className="max-w-xl mx-auto">
						<AnimateText variants={A.textVariants} className="text-white">
							{text}
						</AnimateText>
					</div>
				</div>
			</div>
		</AnimateEntrance>
	)
}

ForSchoolsLargeImage.propTypes = {
	heading: string.isRequired,
	text: string.isRequired,
	image: shape(T.craftImage).isRequired
}

export default ForSchoolsLargeImage

/*
 */
