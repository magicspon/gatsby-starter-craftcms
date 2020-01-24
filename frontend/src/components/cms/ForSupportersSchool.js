import React from 'react'
import { string, shape } from 'prop-types'
import { motion } from 'framer-motion'
import AnimateEntrance from '@/utils/AnimateEntrance'
import * as A from '@/utils/transitions'
import Button from '@/components/Button'
import Link from '@/utils/Link'
import { Heading, Text } from '@/utils/Text'
import Image from '@/utils/Image'
import * as T from '@/types'

const AnimateHeading = motion.custom(Heading)
const AnimateText = motion.custom(Text)
const AnimateButton = motion.custom(Button)

function ForSupportersSchool({ heading, text, button, image }) {
	return (
		<AnimateEntrance className="w-full">
			<div className="mx-auto lg:flex lg:max-w-wrapper lg:px-16">
				<motion.div variants={A.textVariants} className="relative lg:w-1/2">
					<div className="w-full aspect-ratio-16/9 lg:aspect-ratio-square">
						<Image
							{...image}
							className="inset-0 object-cover w-full h-full"
							style={{ position: 'absolute' }}
						/>
					</div>
				</motion.div>
				<motion.div
					variants={A.textVariants}
					className="px-6 py-10 bg-gray-100 md:p-12 lg:w-1/2 lg:mx-0 lg:py-16 lg:px-16"
				>
					<div className="w-full max-w-md lg:mx-auto">
						<AnimateHeading
							variants={A.buttonVariants}
							as="h3"
							className="mb-12"
						>
							{heading}
						</AnimateHeading>
						<AnimateText variants={A.buttonVariants} className="mb-8">
							{text}
						</AnimateText>
						<AnimateButton
							variants={A.buttonVariants}
							className="w-full max-w-3xs"
							as={Link}
							to={button.link}
						>
							{button.text}
						</AnimateButton>
					</div>
				</motion.div>
			</div>
		</AnimateEntrance>
	)
}

ForSupportersSchool.propTypes = {
	heading: string.isRequired,
	text: string.isRequired,
	button: shape({
		text: string.isRequired,
		link: string.isRequired
	}).isRequired,
	image: shape(T.craftImage).isRequired
}

export default ForSupportersSchool
