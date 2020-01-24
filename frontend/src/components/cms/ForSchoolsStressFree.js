import React from 'react'
import { string, shape } from 'prop-types'

import { motion } from 'framer-motion'
import AnimateEntrance from '@/utils/AnimateEntrance'
import * as A from '@/utils/transitions'
import Button from '@/components/Button'
import * as T from '@/types'
import Link from '@/utils/Link'
import { Heading, Text } from '@/utils/Text'
import Image from '@/utils/Image'

const AnimateHeading = motion.custom(Heading)
const AnimateText = motion.custom(Text)
const AnimateButton = motion.custom(Button)

function ForSchoolsStressFree({ heading, text, button, image }) {
	return (
		<AnimateEntrance className="pt-40 bg-gray-100 lg:pt-56">
			<div className="wrapper">
				<AnimateHeading
					variants={A.textVariants}
					as="h2"
					className="max-w-2xl mx-auto mb-12 text-center md:mb-20 md:px-4"
				>
					{heading}
				</AnimateHeading>
				<div className="md:flex lg:flex-row-reverse md:justify-center">
					<div className="max-w-md md:w-1/2 md:px-4">
						<AnimateText variants={A.textVariants} className="w-full mb-8">
							{text}
						</AnimateText>

						<AnimateButton
							variants={A.buttonVariants}
							as={Link}
							to={button.link}
							className="mb-12"
						>
							{button.text}
						</AnimateButton>
					</div>

					<div className="md:w-1/2 md:px-4">
						<motion.div
							variants={A.textVariants}
							className="w-full mx-auto lg:w-8/12"
						>
							<Image {...image} />
						</motion.div>
					</div>
				</div>
			</div>
		</AnimateEntrance>
	)
}

ForSchoolsStressFree.propTypes = {
	heading: string.isRequired,
	text: string.isRequired,
	button: shape({
		text: string.isRequired,
		link: string.isRequired
	}).isRequired,
	image: shape(T.craftImage).isRequired
}

export default ForSchoolsStressFree
