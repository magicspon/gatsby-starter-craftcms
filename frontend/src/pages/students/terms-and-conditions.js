import React, { useContext, useEffect } from 'react'
import { string, shape, arrayOf } from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { ThemeContext } from '@/container/ThemeProvider'
import Box from '@/components/Box'
import Button from '@/components/Button'
import withAuth from '@/utils/withAuth'
import Link from '@/utils/Link'
import IconWrapper from '@/utils/IconWrapper'
import RichText from '@/utils/RichText'
import ArrowIcon from '@/icons/arrow.svg'
import * as T from '@/types'
import terms from '@/content/register_parent.json'

function TermsAndConditions({ first_name, last_name, email, students }) {
	const { setTheme } = useContext(ThemeContext)
	const backUrl = students && students.length ? '/students/' : '/students/add/'

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	return (
		<>
			<Helmet>
				<title>Terms and conditions | GoodGive</title>
			</Helmet>

			<div className="wrapper">
				<div className="py-8 md:flex md:justify-between">
					<div className="relative md:w-2/5">
						<div className="sticky top-32">
							<Box className="mb-8">
								<h3 className="mb-6 text-xl leading-tight font-sans-semi md:text-2xl">
									{first_name} {last_name}
								</h3>

								<ul className="mb-5 text-md">
									<li>Parent/Guardian</li>
									<li>{email}</li>
								</ul>
							</Box>

							<Button className="w-full" as={Link} to={backUrl}>
								<IconWrapper icon={ArrowIcon} className="w-4 mr-4 rotate-180" />
								Back to registration
							</Button>
						</div>
					</div>

					<div className="md:w-1/2">
						<h1 className="mb-6 text-lg font-sans-semi">
							Terms and Conditions
						</h1>
						<RichText
							className="mb-8"
							dangerouslySetInnerHTML={{ __html: terms.content }}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

TermsAndConditions.propTypes = {
	first_name: string,
	last_name: string,
	email: string,
	students: arrayOf(shape(T.student))
}

export default withAuth(TermsAndConditions, 'parent')
