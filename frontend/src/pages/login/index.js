import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { ThemeContext } from '@/container/ThemeProvider'
import FormLogin from '@/components/FormLogin'

function Login() {
	const { setTheme } = useContext(ThemeContext)

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	return (
		<>
			<Helmet>
				<title>Login | GoodGive</title>
			</Helmet>

			<div className="wrapper">
				<div className="w-full max-w-xl pt-12 pb-24 mx-auto">
					<FormLogin
						title="Login"
						name="supporter"
						showCreateAccountLink
						createUrl="/register/"
					/>
				</div>
			</div>
		</>
	)
}

export default Login
