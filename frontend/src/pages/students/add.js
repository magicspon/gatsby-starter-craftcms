import React, { useContext, useEffect, useState } from 'react'
import { string, shape } from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { ThemeContext } from '@/container/ThemeProvider'
import Box from '@/components/Box'
import RichText from '@/utils/RichText'
import FormCreateStudent from '@/components/FormCreateStudent'
import withAuth from '@/utils/withAuth'
import * as T from '@/types'
const AnimatableBox = motion.custom(Box)
import IconWrapper from '@/utils/IconWrapper'
import DeleteIcon from '@/icons/delete.svg'
import { fade } from '@/utils/transitions'

function AddStudents({ access_token, pageContext: { organisations } }) {
	const { setTheme } = useContext(ThemeContext)
	const { students } = useSelector(({ user }) => user)
	const [showWelcome, setShowWelcome] = useState(!students || !students.length)

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	return (
		<>
			<Helmet>
				<title>Add students | GoodGive</title>
			</Helmet>

			<div className="wrapper">
				<div className="py-8 md:flex md:justify-between">
					<div className="md:w-2/5">
						<Box>
							<h3 className="mb-6 text-xl leading-tight font-sans-semi md:text-2xl">
								Student Registration
							</h3>
							<RichText className="mb-8">
								<p className="text-pale">
									To register your child with GoodGive, you must be a
									parent/guardian of the relevant child and complete the steps
									below:
								</p>
								<ol className="pl-4 list-decimal">
									<li className="mb-4 text-pale">
										Create an account with your details
									</li>
									<li>
										Create an account for each of your children with their
										respective schools
									</li>
								</ol>
							</RichText>
						</Box>
					</div>

					<div className="md:w-1/2">
						<AnimatePresence>
							{showWelcome && (
								<AnimatableBox
									key="w"
									positionTransition={{
										duration: 0.5,
										ease: [0.43, 0.13, 0.23, 0.96]
									}}
									variants={fade}
									initial="initial"
									animate="enter"
									exit="exit"
									className="relative mb-8 text-white bg-blue-600"
								>
									<div className="mb-6">
										<h3 className="mb-6 leading-tight tracking-tight text-md font-sans-semi md:text-xl">
											Next Step: Add a student
										</h3>
										<p>
											Great! Your parent account has been created and verified.
											The next step is to create an account for each student in
											your family by filling in their details below.
										</p>
									</div>
									<IconWrapper
										onClick={() => setShowWelcome(false)}
										as="button"
										type="button"
										icon={DeleteIcon}
										className="absolute w-3 text-white top-4 right-4"
									/>
								</AnimatableBox>
							)}
							<motion.div
								variants={fade}
								initial="initial"
								animate="enter"
								exit="exit"
								positionTransition={{
									duration: 0.5,
									ease: [0.43, 0.13, 0.23, 0.96]
								}}
							>
								<FormCreateStudent
									access_token={access_token}
									organisations={organisations}
								/>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>
		</>
	)
}

AddStudents.propTypes = {
	pageContext: shape({
		organisations: T.organisations
	}),
	access_token: string.isRequired
}

export default withAuth(AddStudents, 'parent')
