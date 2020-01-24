import React from 'react'
import { string, shape, arrayOf } from 'prop-types'
import { motion } from 'framer-motion'
import AnimateEntrance from '@/utils/AnimateEntrance'
import * as A from '@/utils/transitions'
import Button from '@/components/Button'
import Link from '@/utils/Link'
import { Heading, Text } from '@/utils/Text'

const AnimateHeading = motion.custom(Heading)
const AnimateText = motion.custom(Text)
const AnimateButton = motion.custom(Button)

function ForSchoolsHowItWorks({ heading, button, items }) {
	return (
		<AnimateEntrance className="wrapper">
			<AnimateHeading
				variants={A.textVariants}
				as="h3"
				className="w-full mx-auto text-center md:w-10/12 lg:w-6/12 md:mb-20"
			>
				{heading}
			</AnimateHeading>
			<div className="w-full mb-8 md:flex md:flex-no-wrap md:justify-between lg:mb-20">
				{items.map(content => (
					<div
						key={content.id}
						className="w-full pb-10 md:px-4 lg:mx-auto md:w-4/12 lg:w-3/12 md:pb-0"
					>
						<div className="w-12 h-12 mb-4 overflow-hidden rounded-full">
							<motion.img
								variants={A.imageVariants}
								src="https://goodgive.imgix.net/Images/temporary/round-icon.svg?auto=compress%2Cformat&fit=clip&q=80&w=100"
								alt="Round icon"
								className="object-cover w-full h-full"
							/>
						</div>
						<motion.h5
							variants={A.textVariants}
							className="mb-4 leading-tight text-md font-sans-semi lg:text-lg"
						>
							{content.heading}
						</motion.h5>
						<AnimateText variants={A.textVariants}>{content.text}</AnimateText>
					</div>
				))}
			</div>
			<div className="flex justify-center">
				<AnimateButton
					variants={A.buttonVariants}
					className="w-full max-w-xs mx-auto"
					as={Link}
					to={button.link}
				>
					{button.text}
				</AnimateButton>
			</div>
		</AnimateEntrance>
	)
}

ForSchoolsHowItWorks.propTypes = {
	heading: string.isRequired,
	button: shape({
		text: string.isRequired,
		link: string.isRequired
	}).isRequired,
	items: arrayOf(
		shape({
			heading: string.isRequired,
			text: string.isRequired,
			id: string.isRequired
		})
	)
}

export default ForSchoolsHowItWorks
