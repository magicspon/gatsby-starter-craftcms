import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { ThemeContext } from '@/container/ThemeProvider'
import FormRegisterParent from '@/components/FormRegisterParent'

function RegisterParents() {
	const { setTheme } = useContext(ThemeContext)

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	return (
		<>
			<Helmet>
				<title>Register Parent | GoodGive</title>
			</Helmet>
			<div className="py-8 md:pt-12 md:pb-24 wrapper">
				<FormRegisterParent />
			</div>
		</>
	)
}

export default RegisterParents
