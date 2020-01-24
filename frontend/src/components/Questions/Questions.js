import React from 'react'
import { string } from 'prop-types'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import AnimateEntrance from '@/utils/AnimateEntrance'
import * as A from '@/utils/transitions'
import IconWrapper from '@/utils/IconWrapper'
import ArrowIcon from '@/icons/arrow.svg'
import * as T from '@/types'
import { Heading, Text } from '@/utils/Text'
import {
	AccordionProvider,
	AccordionItem,
	AccordionButton
} from '@/components/Accordion'

const AnimateHeading = motion.custom(Heading)

function Questions({ heading, faq }) {
	return (
		<AnimateEntrance id="faq" className="py-20 bg-gray-100">
			<div className="wrapper">
				<div className="pb-10 md:pb-16">
					<div className="w-full col lg:w-6/12">
						<AnimateHeading
							variants={A.textVariants}
							scale="h2"
							as="h1"
							className="text-center md:text-left"
						>
							{heading}
						</AnimateHeading>
					</div>
				</div>
				<div className="relative w-full max-w-3xl">
					<AccordionProvider>
						{faq.map((item, index) => (
							<motion.div
								variants={A.buttonVariants}
								key={item.id}
								className="py-4 border-b border-300 lg:py-19"
							>
								<AccordionButton
									index={index}
									className={classNames(
										'flex flex-no-wrap items-center justify-between w-full text-left group focus:outline-none opacity-30 hocus:opacity-50'
									)}
									activeClassName="opacity-100"
								>
									{({ currentIndex }) => (
										<>
											<span
												className={classNames(
													'mr-4 font-sans text-2md md:text-lg leading-tight'
												)}
											>
												{item.question}
											</span>
											<IconWrapper
												icon={ArrowIcon}
												className={classNames(
													'w-4 ml-auto group-hover:opacity-100',
													{
														'opacity-100 rotate-90 transition-transform':
															currentIndex === index,
														'opacity-0': currentIndex !== index
													}
												)}
											/>
										</>
									)}
								</AccordionButton>
								<AccordionItem index={index}>
									<div className="py-6">
										<Text className="w-10/12">{item.answer}</Text>
									</div>
								</AccordionItem>
							</motion.div>
						))}
					</AccordionProvider>
				</div>
			</div>
		</AnimateEntrance>
	)
}

Questions.propTypes = {
	heading: string,
	faq: T.craftFaqBlock.isRequired
}

export default Questions
