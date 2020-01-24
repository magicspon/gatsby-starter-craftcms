import React from 'react'
import { string, shape, arrayOf } from 'prop-types'
import Carousel from 'nuka-carousel'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import AnimateEntrance from '@/utils/AnimateEntrance'
import * as A from '@/utils/transitions'
import Button from '@/components/Button'
import Link from '@/utils/Link'
import { Heading, Text } from '@/utils/Text'
import styles from './ForSupportersHowItWorks.module.css'
import useMediaQuery from '@/hooks/useMediaQuery'

const AnimateHeading = motion.custom(Heading)
const AnimateText = motion.custom(Text)
const AnimateButton = motion.custom(Button)
function ForSupportersHowItWorks({ heading, button, items }) {
	const isTablet = useMediaQuery('(min-width: 46em)')
	const isDesktop = useMediaQuery('(min-width: 64em)')
	const toShow = isDesktop ? 3 : isTablet ? 2 : 1

	return (
		<AnimateEntrance className="w-full overflow-hidden">
			<div className={classNames('wrapper', styles.slide)}>
				<AnimateHeading
					variants={A.textVariants}
					as="h3"
					className="max-w-xl mx-auto mb-12 text-center"
				>
					{heading}
				</AnimateHeading>
				<div className="mb-12 lg:mb-16">
					<Carousel
						heightMode="max"
						cellSpacing={20}
						withoutControls
						frameOverflow="visible"
						autoGenerateStyleTag={false}
						slidesToShow={toShow}
					>
						{items.map(content => (
							<motion.div
								key={content.id}
								variants={A.imageVariants}
								className="flex flex-col h-full px-6 py-8 border-2 border-blue-600 rounded-lg"
							>
								<motion.h5
									variants={A.textVariants}
									className="mb-4 text-lg leading-tight text-blue-600 font-sans-semi"
								>
									{content.heading}
								</motion.h5>
								<AnimateText
									variants={A.textVariants}
									className="text-blue-600"
								>
									{content.text}
								</AnimateText>
							</motion.div>
						))}
					</Carousel>
				</div>
				<div className="md:flex md:justify-center">
					<AnimateButton variants={A.buttonVariants} as={Link} to={button.link}>
						{button.text}
					</AnimateButton>
				</div>
			</div>
		</AnimateEntrance>
	)
}

ForSupportersHowItWorks.propTypes = {
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

export default ForSupportersHowItWorks
