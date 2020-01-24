import React, { useCallback, useState } from 'react'
import { func } from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import InputField from '@/components/InputField'
import Label from '@/components/Label'
import Button from '@/components/Button'
import { fade } from '@/utils/transitions'
import Switch from '@/utils/Switch'
import api from '@/utils/api'
import { REGISTER } from '@/utils/endpoints'
import useProgressBar from '@/hooks/useProgressBar'
import Link from '@/utils/Link'
import SubmitButton from '@/components/SubmitButton'
import useFormErrors from '@/hooks/useFormErrors'
import FormError from '@/utils/FormError'

function FormRegisterSupporter({ setView: toggleView, onProductLogin }) {
	const { register, handleSubmit, errors } = useForm()
	const [view, setView] = useState('form')
	const { errorRef, formError, setFormError } = useFormErrors()
	const { isLoading, setLoading } = useProgressBar()
	const dispatch = useDispatch()

	const onSubmit = useCallback(
		async data => {
			setLoading(true)
			setFormError(false)

			const body = { ...data, type: 'supporter' }

			const response = await api(REGISTER, {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'text/plain',
					Accept: '*'
				}
			})

			if (response.status >= 200 && response.status < 300) {
				// after logging in from the product page
				const { access_token } = await response.json()

				const user = await dispatch({
					type: 'user/REQUEST_USER',
					payload: { access_token, role: 'supporter' }
				})
				setLoading(false)

				if (onProductLogin && user === true) {
					onProductLogin(access_token)
					return
				}

				setView('thanks')
				return
			}

			const { messages } = JSON.parse(response.message)
			setLoading(false)
			setFormError(messages)
		},
		[dispatch, onProductLogin, setFormError, setLoading]
	)

	return (
		<AnimatePresence exitBeforeEnter>
			<Switch test={view}>
				<motion.div
					case="form"
					variants={fade}
					initial="initial"
					animate="enter"
					exit="exit"
				>
					<div className="mb-8">
						<h1 className="mb-4 leading-tight text-md md:text-xl font-sans-semi">
							Create a supporter account
						</h1>
						<p className="text-pale">
							Enter your details below. <br />
							If you are a parent or guardian please ask your school for a
							registration link.
						</p>
					</div>
					<FormError ref={errorRef} error={formError} />
					<form method="POST" onSubmit={handleSubmit(onSubmit)}>
						<fieldset>
							<Label
								htmlFor="first_name"
								text="First Name"
								className="w-full mb-4"
							>
								<InputField
									className="w-full"
									id="first_name"
									name="first_name"
									type="text"
									placeholder="John"
									ref={register({ required: 'This field is required' })}
									error={errors.first_name}
								/>
							</Label>
							<Label
								htmlFor="last_name"
								text="Last Name"
								className="w-full mb-4"
							>
								<InputField
									className="w-full"
									id="last_name"
									name="last_name"
									type="text"
									placeholder="Smith"
									ref={register({ required: 'This field is required' })}
									error={errors.last_name}
								/>
							</Label>
							<Label htmlFor="email" text="Email" className="w-full mb-4">
								<InputField
									autoComplete="username"
									className="w-full"
									id="email"
									name="email"
									type="email"
									placeholder="j.smith@gmail.com"
									ref={register({ required: 'This field is required' })}
									error={errors.email}
								/>
							</Label>
							<Label htmlFor="password" text="Password" className="w-full mb-4">
								<InputField
									className="w-full"
									id="password"
									name="password"
									type="password"
									autoComplete="new-password"
									ref={register({
										required: 'This field is required',
										minLength: 6
									})}
									error={errors.password}
								/>
							</Label>
							<SubmitButton
								isLoading={isLoading}
								type="submit"
								className="w-full mb-8"
							>
								Create account
							</SubmitButton>
							<p className="text-sm text-center text-gray-700">
								Already have an account?{' '}
								<Link
									to="/login/"
									className="underline"
									onClick={e => {
										if (toggleView) {
											e.preventDefault()
											toggleView('login')
										}
									}}
								>
									Click here
								</Link>{' '}
								to login
							</p>
						</fieldset>
					</form>
				</motion.div>
				<motion.div
					case="thanks"
					variants={fade}
					initial="initial"
					animate="enter"
					exit="exit"
				>
					<div className="mb-8">
						<h1 className="mb-4 leading-tight text-md md:text-xl font-sans-semi">
							Thanks for signing up
						</h1>
						<p className="text-pale">
							Please check your email (and spam) for an an account activation
							link which you'll receive shortly.
						</p>
					</div>

					<Button as={Link} to="/" className="w-full">
						Proceed to shop
					</Button>
				</motion.div>
			</Switch>
		</AnimatePresence>
	)
}

FormRegisterSupporter.propTypes = {
	setView: func,
	onProductLogin: func
}

export default FormRegisterSupporter
