import React from 'react'
import { string, shape } from 'prop-types'
import { motion } from 'framer-motion'
import AnimateEntrance from '@/utils/AnimateEntrance'
import * as A from '@/utils/transitions'
import * as T from '@/types'
import { Heading, Text } from '@/utils/Text'
import Button from '@/components/Button'
import Link from '@/utils/Link'
import Image from '@/utils/Image'

const AnimateHeading = motion.custom(Heading)
const AnimateText = motion.custom(Text)
const AnimateButton = motion.custom(Button)
function ForSchoolsIntro({ heading, text, button, phoneImage, tabletImage }) {
	return (
		<AnimateEntrance as="div" className="mx-auto lg:flex lg:max-w-wrapper">
			<div className="px-6 mb-10 sm:px-8 md:px-12 lg:px-16 lg:pr-0 lg:w-1/2">
				<AnimateHeading
					variants={A.textVariants}
					as="h1"
					className="max-w-xl mb-6 opacity-0"
				>
					{heading}
				</AnimateHeading>
				<AnimateText variants={A.textVariants} className="mb-6 md:w-8/12">
					{text}
				</AnimateText>
				<AnimateButton
					variants={A.buttonVariants}
					className="w-full max-w-xs opacity-0"
					as={Link}
					to={button.link}
				>
					{button.text}
				</AnimateButton>
			</div>
			<div className="relative pl-6 -mb-24 lg:-mb-32 sm:pl-8 md:pl-12 lg:pl-0 lg:w-half/screen lg:-mr-1/2">
				<div className="relative w-10/12 max-w-2xl ml-auto">
					<motion.div
						variants={{
							show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
							hide: { opacity: 0, x: 50 }
						}}
					>
						<Image {...tabletImage} />
					</motion.div>
					<motion.div
						variants={{
							show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
							hide: { opacity: 0, y: 50 }
						}}
						className="absolute w-1/2 -left-2/10 top-2/10"
					>
						<Image {...phoneImage} />
					</motion.div>
				</div>
			</div>
		</AnimateEntrance>
	)
}

ForSchoolsIntro.propTypes = {
	heading: string.isRequired,
	text: string.isRequired,
	button: shape({
		text: string.isRequired,
		link: string.isRequired
	}).isRequired,
	phoneImage: shape(T.craftImage).isRequired,
	tabletImage: shape(T.craftImage).isRequired
}

export default ForSchoolsIntro
