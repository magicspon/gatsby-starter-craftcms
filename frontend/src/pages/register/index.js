import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { ThemeContext } from '@/container/ThemeProvider'
import FormRegisterSupporter from '@/components/FormRegisterSupporter'
import Box from '@/components/Box'

function Register() {
	const { setTheme } = useContext(ThemeContext)

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	return (
		<>
			<Helmet>
				<title>Create account | GoodGive</title>
			</Helmet>
			<div className="wrapper">
				<div className="flex justify-center py-8 md:pt-12 md:pb-24">
					<Box className="w-full max-w-xl p-4 mx-auto md:p-8">
						<FormRegisterSupporter />
					</Box>
				</div>
			</div>
		</>
	)
}

export default Register
