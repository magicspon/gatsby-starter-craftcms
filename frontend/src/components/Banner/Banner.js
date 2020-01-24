import React from 'react'
import { string, arrayOf, shape } from 'prop-types'
import { motion } from 'framer-motion'
import AnimateEntrance from '@/utils/AnimateEntrance'
import * as A from '@/utils/transitions'
import Button from '@/components/Button'
import { Heading } from '@/utils/Text'
import Link from '@/utils/Link'

const AnimateHeading = motion.custom(Heading)
const AnimateButton = motion.custom(Button)

function Banner({ heading, buttons }) {
	return (
		<AnimateEntrance
			variants={{
				show: {
					opacity: 1,
					transition: {
						type: 'spring',
						damping: 100,
						stiffness: 50,
						staggerChildren: 0.3,
						delayChildren: 0.2
					}
				},
				hide: {
					opacity: 0,
					transition: {
						delay: 0.23,
						duration: 0.3
					}
				}
			}}
			className="max-w-4xl py-16 mx-auto bg-blue-600 md:py-24"
		>
			<div className="flex flex-col items-center text-center wrapper">
				<AnimateHeading
					variants={A.textVariants}
					as="h1"
					className="w-11/12 mx-auto mb-8 text-white md:mb-10 md:w-10/12 lg:w-full"
				>
					{heading}
				</AnimateHeading>
				<div className="justify-center w-full md:flex">
					{buttons.map(button => (
						<AnimateButton
							variants={A.buttonVariants}
							key={button.text}
							as={Link}
							to={button.link}
							theme="white"
							className="w-full max-w-xs mb-4 last:mb-0 md:mb-0 md:mx-2"
						>
							{button.text}
						</AnimateButton>
					))}
				</div>
			</div>
		</AnimateEntrance>
	)
}

Banner.propTypes = {
	heading: string.isRequired,
	buttons: arrayOf(shape({ text: string.isRequired, link: string.isRequired }))
}

export default Banner
