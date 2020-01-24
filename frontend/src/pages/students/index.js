import React, { useContext, useEffect, useState } from 'react'
import { string, shape, arrayOf } from 'prop-types'
import { Helmet } from 'react-helmet-async'
import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import { useCookies } from 'react-cookie'
import { ThemeContext } from '@/container/ThemeProvider'
import Box from '@/components/Box'
import FormEditStudent from '@/components/FormEditStudent'
import Button from '@/components/Button'
import withAuth from '@/utils/withAuth'
import Link from '@/utils/Link'
import { fade } from '@/utils/transitions'
import IconWrapper from '@/utils/IconWrapper'
import DeleteIcon from '@/icons/delete.svg'
import CampaignPanel from '@/components/CampaignPanel'
import * as T from '@/types'

const AnimatableBox = motion.custom(Box)

function Students({
	access_token,
	first_name,
	last_name,
	email,
	students = [],
	pageContext: { organisations }
}) {
	const { setTheme } = useContext(ThemeContext)
	const [cookies, setCookie] = useCookies()
	const hasVisited = cookies.goodgive
	const [showWelcome, setShowWelcome] = useState(hasVisited !== 'true')
	const [newStudent, addNewStudent] = useState()

	useEffect(() => {
		if (hasVisited !== 'true') {
			setCookie('goodgive', JSON.stringify(true), {
				path: '/',
				maxAge: 60 // one min for testing  // 3144960000 // 100 years
			})
		}
	}, [hasVisited, setCookie])

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	return (
		<>
			<Helmet>
				<title>Edit students | GoodGive</title>
			</Helmet>

			<div className="wrapper">
				<div className="py-8 md:flex md:justify-between">
					<div className="relative md:w-2/5">
						<Box className="sticky top-32">
							<h3 className="mb-6 text-xl leading-tight font-sans-semi md:text-2xl">
								{first_name} {last_name}
							</h3>

							<ul className="mb-5 text-md">
								<li>Parent/Guardian</li>
								<li>{email}</li>
							</ul>

							<div className="mb-8">
								<Link
									to="/edit-profile/"
									className="text-sm text-gray-700 underline focus:outline-none hocus:text-blue-600"
								>
									Edit details
								</Link>
							</div>

							<Button
								className="w-full"
								as="button"
								type="button"
								disabled={newStudent}
								onClick={() => {
									addNewStudent(true)
								}}
							>
								Add student
							</Button>
						</Box>
					</div>

					<div className="md:w-1/2">
						<AnimatePresence>
							{newStudent && (
								<motion.div
									key="temp"
									variants={fade}
									initial="initial"
									animate="enter"
									exit="exit"
									positionTransition={{
										duration: 0.5,
										ease: [0.43, 0.13, 0.23, 0.96]
									}}
									className="mb-8"
								>
									<FormEditStudent
										addNewStudent={addNewStudent}
										organisations={organisations}
									/>
								</motion.div>
							)}
							{showWelcome && (
								<AnimatableBox
									key="w"
									variants={fade}
									initial="initial"
									animate="enter"
									exit="exit"
									className="relative mb-8 text-white bg-blue-600"
								>
									<div className="mb-6">
										<h3 className="mb-6 leading-tight tracking-tight text-md font-sans-semi md:text-xl">
											Thanks for registering!
										</h3>
										<p>
											View and edit each registered student’s details below. As
											soon as a school campaign commences, a button will appear
											for you to shop or to send yourself the campaign details
											and your fundraising code.
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
							{students.map((student, index) => (
								<motion.div
									key={student.id}
									variants={fade}
									initial="initial"
									animate="enter"
									exit="exit"
									positionTransition={{
										duration: 0.5,
										ease: [0.43, 0.13, 0.23, 0.96]
									}}
									className={classNames({
										'mb-8': index < students.length - 1
									})}
								>
									<FormEditStudent
										organisations={organisations}
										access_token={access_token}
										{...student}
										className={classNames({
											'rounded-b-none': student.has_active_campaign
										})}
									/>
									{student.has_active_campaign && (
										<CampaignPanel
											campaign_url={student.campaign_url}
											id={student.id}
											name={student.organisation.name}
											access_token={access_token}
										/>
									)}
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</>
	)
}

Students.propTypes = {
	pageContext: shape({
		organisations: T.organisations
	}),
	access_token: string,
	first_name: string,
	last_name: string,
	email: string,
	students: arrayOf(shape(T.student))
}

export default withAuth(Students, 'parent')
