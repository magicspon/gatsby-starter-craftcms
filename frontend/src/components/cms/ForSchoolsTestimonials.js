import React from 'react'
import { string, shape, arrayOf } from 'prop-types'
import Carousel from 'nuka-carousel'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import AnimateEntrance from '@/utils/AnimateEntrance'
import * as A from '@/utils/transitions'
import { Heading } from '@/utils/Text'
import styles from './ForSchoolsTestimonials.module.css'

const AnimateHeading = motion.custom(Heading)

function ForSchoolsTestimonials({ heading, subheading, testimonials }) {
	return (
		<AnimateEntrance>
			<div className="mb-20 text-center wrapper">
				<motion.h4
					variants={A.textVariants}
					className="mb-4 text-center text-2md font-sans-semi"
				>
					{subheading}
				</motion.h4>
				<div className="w-full mx-auto md:w-10/12 lg:w-6/12">
					<AnimateHeading variants={A.textVariants} as="h3">
						{heading}
					</AnimateHeading>
				</div>
			</div>
			<div className="w-full overflow-hidden">
				<div className={classNames('wrapper', styles.slide)}>
					<div className="max-w-xl mx-auto">
						<Carousel
							cellAlign="center"
							cellSpacing={20}
							withoutControls
							frameOverflow="visible"
							slideIndex={1}
						>
							{testimonials.map(item => (
								<motion.div
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
									key={item.id}
									className="max-w-xl px-4 py-12 mx-auto text-center border-2 border-gray-100 rounded-lg md:pb-8 md:pt-20"
								>
									<AnimateHeading
										variants={A.textVariants}
										scale="h3"
										as="h4"
										className="mb-12 text-center"
									>
										{item.text}
									</AnimateHeading>
									<motion.h5
										varaints={A.imageVariants}
										className="mb-2 leading-tight text-2md font-sans-semi md:pb-0"
									>
										{item.by}
									</motion.h5>
									{item.association && (
										<motion.p
											varaints={A.imageVariants}
											className="text-sm text-pale"
										>
											{item.association}
										</motion.p>
									)}
								</motion.div>
							))}
						</Carousel>
					</div>
				</div>
			</div>
		</AnimateEntrance>
	)
}

ForSchoolsTestimonials.propTypes = {
	heading: string.isRequired,
	subheading: string.isRequired,
	testimonials: arrayOf(
		shape({
			association: string,
			by: string.isRequired,
			text: string.isRequired,
			id: string.isRequired
		})
	)
}

export default ForSchoolsTestimonials
