import React, { useContext, useEffect } from 'react'
import { string } from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { ThemeContext } from '@/container/ThemeProvider'
import Box from '@/components/Box'
import Button from '@/components/Button'
import Link from '@/utils/Link'
import withAuth from '@/utils/withAuth'
import FormEditParent from '@/components/FormEditParent'

function EditProfile({ access_token, first_name, last_name, email }) {
	const { setTheme } = useContext(ThemeContext)

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	return (
		<>
			<Helmet>
				<title>Edit Profile | GoodGive</title>
			</Helmet>

			<div className="wrapper">
				<div className="py-8 md:flex md:justify-between">
					<div className="relative md:w-2/5">
						<Box className="sticky mb-8 top-32">
							<h3 className="mb-6 text-xl leading-tight font-sans-semi md:text-2xl">
								{first_name} {last_name}
							</h3>

							<ul className="mb-5 text-md">
								<li>Parent/Guardian</li>
								<li>{email}</li>
							</ul>
						</Box>

						<Button className="w-full" as={Link} to="/students/">
							Back
						</Button>
					</div>

					<div className="md:w-1/2">
						<FormEditParent
							first_name={first_name}
							last_name={last_name}
							email={email}
							access_token={access_token}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

EditProfile.propTypes = {
	access_token: string.isRequired,
	first_name: string,
	last_name: string,
	email: string
}

export default withAuth(EditProfile, 'parent')
