import React from 'react'
import { string, node } from 'prop-types'
import classNames from 'classnames'
import Carousel from 'nuka-carousel'
import { motion } from 'framer-motion'
import AnimateEntrance from '@/utils/AnimateEntrance'
import * as A from '@/utils/transitions'
import * as T from '@/types'
import { Heading } from '@/utils/Text'
import useMediaQuery from '@/hooks/useMediaQuery'
import Image from '@/utils/Image'

const AnimateHeading = motion.custom(Heading)
function SlideWrapper({ children }) {
	return (
		<Carousel cellSpacing={20} withoutControls frameOverflow="visible">
			{children}
		</Carousel>
	)
}

SlideWrapper.propTypes = {
	children: node.isRequired
}

function GridWrapper({ children }) {
	return (
		<div className="md:flex md:flex-wrap lg:justify-center lg:items-start">
			{children}
		</div>
	)
}

GridWrapper.propTypes = {
	children: node.isRequired
}

function QuoteGrid({ testimonials, heading }) {
	const match = useMediaQuery('(min-width: 46em)')
	const Wrapper = match ? GridWrapper : SlideWrapper

	return (
		<div className="w-full mb-12 md:mb-0">
			<AnimateEntrance className="mb-20 wrapper">
				<AnimateHeading
					variants={A.textVariants}
					as="h3"
					scale="h1"
					className="mx-auto text-center md:w-10/12 lg:w-6/12"
				>
					{heading}
				</AnimateHeading>
			</AnimateEntrance>
			<div className="wrapper">
				<Wrapper>
					{testimonials.map((quote, index) => (
						<AnimateEntrance
							variants={{
								show: {
									transition: {
										type: 'spring',
										damping: 100,
										stiffness: 50,
										staggerChildren: 0.3,
										delayChildren: 0.2
									},
									opacity: 1,
									y: 0
								},
								hide: {
									transition: {
										delay: 0.23,
										duration: 0.3
									},
									opacity: 0,
									y: 100
								}
							}}
							className={classNames(
								'p-6 bg-white shadow-lg md:p-12 md:mb-16  md:w-2/3 lg:w-5/12 lg:mx-auto lg:mb-20',
								{
									'ml-auto': index % 2 !== 0,
									'lg:my-20': index % 3 === 0,
									'lg:mx-1/4': (index + 1) % 3 === 0
								}
							)}
							key={quote.id}
						>
							<motion.blockquote
								variants={A.textVariants}
								className="mb-16 tracking-tight text-2md font-sans-semi"
							>
								{quote.text}
							</motion.blockquote>
							<div className="flex flex-no-wrap">
								{!!quote.image.length && (
									<motion.div
										variants={A.imageVariants}
										className="flex-shrink-0 w-12 h-12 mr-4 rounded-full"
									>
										<Image
											{...quote.image[0]}
											className="object-cover w-full h-full"
										/>
									</motion.div>
								)}
								{quote.by && (
									<motion.p variants={A.textVariants} className="text-sm">
										<strong className="block font-normal">{quote.by}</strong>
										{quote.association}
									</motion.p>
								)}
							</div>
						</AnimateEntrance>
					))}
				</Wrapper>
			</div>
		</div>
	)
}

QuoteGrid.propTypes = {
	testimonials: T.craftTestimonialBlock.isRequired,
	heading: string.isRequired
}

export default QuoteGrid
