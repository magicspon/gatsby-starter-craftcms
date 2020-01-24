import React, { useEffect, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import FormResetPassword from '@/components/FormResetPassword'
import Box from '@/components/Box'
import { ThemeContext } from '@/container/ThemeProvider'

function Forgotten() {
	const { setTheme } = useContext(ThemeContext)

	useEffect(() => {
		setTheme('light')
	}, [setTheme])
	return (
		<>
			<Helmet>
				<title>Forgotten | GoodGive</title>
			</Helmet>
			<div className="wrapper">
				<div className="flex justify-center py-8 md:pt-12 md:pb-24">
					<Box className="w-full max-w-xl p-4 mx-auto md:p-8">
						<FormResetPassword />
					</Box>
				</div>
			</div>
		</>
	)
}

export default Forgotten
