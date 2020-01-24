import React, { useContext, useEffect } from 'react'
import { string, shape } from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { stripSlashes } from '@/utils'
import { ThemeContext } from '@/container/ThemeProvider'
import Box from '@/components/Box'
import FormNewPassword from '@/components/FormNewPassword'

function ResetPassword({ location: { pathname } }) {
	const path = stripSlashes(pathname)
	const [, reset, token] = path.split('/')
	const { setTheme } = useContext(ThemeContext)

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	if (reset !== 'reset' || typeof token !== 'string') {
		return null
	}

	return (
		<>
			<Helmet>
				<title>Reset password | GoodGive</title>
			</Helmet>

			<div className="py-12 wrapper">
				<Box className="w-full max-w-xl p-4 mx-auto md:p-8">
					<FormNewPassword token={token} />
				</Box>
			</div>
		</>
	)
}

ResetPassword.propTypes = {
	location: shape({
		pathname: string.isRequired
	}).isRequired
}

export default ResetPassword
