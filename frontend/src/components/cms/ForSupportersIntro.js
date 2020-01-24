import React from 'react'
import { string, shape, arrayOf } from 'prop-types'
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

function ForSupportersIntro({ heading, text, button, images }) {
	return (
		<AnimateEntrance>
			<div className="mb-12 text-center wrapper">
				<div className="max-w-2xl mx-auto">
					<AnimateHeading
						variants={A.textVariants}
						as="h1"
						className="mb-6 opacity-0"
					>
						{heading}
					</AnimateHeading>
					<AnimateText
						variants={A.textVariants}
						className="mx-auto mb-6 opacity-0 md:w-8/12"
					>
						{text}
					</AnimateText>
					<AnimateButton
						className="opacity-0"
						variants={A.buttonVariants}
						as={Link}
						to={button.link}
					>
						{button.text}
					</AnimateButton>
				</div>
			</div>
			<motion.section
				variants={A.buttonVariants}
				className="w-full overflow-hidden"
			>
				<motion.div
					animate={{
						x: ['0%', '-33.333%']
					}}
					transition={{
						duration: images.length * 7.5,
						ease: 'linear',
						loop: Infinity,
						repeatDelay: 0
					}}
					className="flex flex-no-wrap whitespace-no-wrap"
				>
					{[...images, ...images, ...images].map((image, index) => (
						<div
							className="w-1/2 mx-auto md:mx-8 min-w-2xs sm:w-1/3 lg:w-1/4"
							key={index}
						>
							<Image {...image} />
						</div>
					))}
				</motion.div>
			</motion.section>
		</AnimateEntrance>
	)
}

ForSupportersIntro.propTypes = {
	heading: string.isRequired,
	text: string.isRequired,
	button: shape({
		text: string.isRequired,
		link: string.isRequired
	}).isRequired,
	images: arrayOf(shape(T.craftImage)).isRequired
}

export default ForSupportersIntro
