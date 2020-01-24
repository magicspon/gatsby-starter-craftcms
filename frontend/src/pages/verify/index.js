import React, { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { string, shape } from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { useAsync } from 'react-async-hook'
import { useSelector } from 'react-redux'
import { navigate } from 'gatsby'
import { stripSlashes } from '@/utils'
import api from '@/utils/api'
import { EMAIL_VERIFICATION } from '@/utils/endpoints'
import { fade } from '@/utils/transitions'
import { ThemeContext } from '@/container/ThemeProvider'
import Box from '@/components/Box'
import Button from '@/components/Button'
// import Link from '@/utils/Link'
import Switch from '@/utils/Switch'
import Spinner from '@/utils/Spinner'
import FormLogin from '@/components/FormLogin'

const verifyUser = async token =>
	api(`${EMAIL_VERIFICATION}${token}`, { method: 'POST' }).then(resp =>
		resp.json()
	)

function VerifyPage({ location: { pathname } }) {
	const path = stripSlashes(pathname)
	const [, token] = path.split('/')
	const { result, status } = useAsync(verifyUser, [token])
	const [view, setView] = useState('loading')
	const { setTheme } = useContext(ThemeContext)
	const { isLoggedIn } = useSelector(state => state.user)

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	useEffect(() => {
		if (status === 'error') {
			setTimeout(() => {
				setView('error')
			}, 1000)

			return
		}

		if (status === 'success') {
			setTimeout(() => {
				setView('success')
			}, 1000)
		}
	}, [result, status, view.result])

	return (
		<>
			<Helmet>
				<title>Login | GoodGive</title>
			</Helmet>

			<div className="py-12 wrapper">
				<AnimatePresence exitBeforeEnter>
					<Switch test={view}>
						<motion.div
							case="success"
							variants={fade}
							initial="initial"
							animate="enter"
							exit="exit"
							className="py-12 md:py-20"
						>
							<FormLogin
								className="w-full max-w-xl p-4 mx-auto md:p-8"
								legend="Great! Your email is verified. Please log back in"
								name="supporter"
								showCreateAccountLink={false}
								createUrl="/register/"
							/>
						</motion.div>

						<motion.div
							case="error"
							variants={fade}
							initial="initial"
							animate="enter"
							exit="exit"
							className="py-24 md:py-40"
						>
							<Box className="w-full max-w-xl p-4 mx-auto md:p-8">
								<div className="mb-8">
									<h1 className="mb-4 leading-tight text-md md:text-xl font-sans-semi">
										Uh oh...
									</h1>
									<p className="text-pale">
										It looks like something has gone wrong with verifying your
										email address
									</p>
								</div>

								<Button as="a" href="#0" className="w-full">
									Contact support
								</Button>
							</Box>
						</motion.div>

						<motion.div
							case="loading"
							variants={fade}
							initial="initial"
							animate="enter"
							exit="exit"
							className="flex items-center justify-center py-24 md:py-40"
						>
							<h1 className="mr-8 text-xl font-sans-semi">Verifying email</h1>
							<Spinner className="w-10 h-10 my-auto text-blue-600" />
						</motion.div>
					</Switch>
				</AnimatePresence>
			</div>
		</>
	)
}

VerifyPage.propTypes = {
	location: shape({
		pathname: string.isRequired
	}).isRequired
}

export default VerifyPage
