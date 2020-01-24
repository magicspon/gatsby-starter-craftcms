import React, { useContext, useEffect } from 'react'
import { string, shape } from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { ThemeContext } from '@/container/ThemeProvider'
import Box from '@/components/Box'
import Button from '@/components/Button'
import Link from '@/utils/Link'
import Spinner from '@/utils/Spinner'
import { isBrowser } from '@/utils'

function PageNotFound({ location: { pathname } }) {
	const { setTheme } = useContext(ThemeContext)

	const clientSidePage =
		pathname.includes('/c/') ||
		pathname.includes('/password/') ||
		pathname.includes('/verify/')

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	return (
		<>
			<Helmet>
				<title>Page not found | GoodGive</title>
			</Helmet>

			{isBrowser ? (
				<div className="py-12 wrapper">
					<Box className="flex flex-col items-center justify-center max-w-xl px-4 mx-auto">
						<p className="mb-6 text-center text-md font-sans-semi">404</p>
						<h1 className="mb-8 text-2xl leading-tight text-center font-sans-semi">
							Page not found
						</h1>
						<Button as={Link} to="/">
							Return home
						</Button>
					</Box>
				</div>
			) : (
				<div className="flex items-center justify-center min-h-xl">
					<h1 className="mr-8 text-xl font-sans-semi">Loading</h1>
					<Spinner className="w-10 h-10 my-auto text-blue-600" />
				</div>
			)}
		</>
	)
}

PageNotFound.propTypes = {
	location: shape({
		pathname: string.isRequired
	}).isRequired
}

export default PageNotFound
