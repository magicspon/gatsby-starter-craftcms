import React, { useCallback, useState } from 'react'
import { string } from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import InputField from '@/components/InputField'
import Label from '@/components/Label'
import Button from '@/components/Button'
import api from '@/utils/api'
import { PASSWORD_RESET } from '@/utils/endpoints'
import useProgressBar from '@/hooks/useProgressBar'
import Switch from '@/utils/Switch'
import { fade } from '@/utils/transitions'
import Link from '@/utils/Link'
import SubmitButton from '@/components/SubmitButton'
import { forgottenPasswordErrors } from '@/utils/errors'

function FormNewPassword({ token }) {
	const { register, handleSubmit, errors } = useForm()
	const { isLoading, setLoading } = useProgressBar()
	const [view, setView] = useState('form')
	const [formError, setFormError] = useState()

	const onSubmit = useCallback(
		async data => {
			setLoading(true)

			const response = await api(PASSWORD_RESET, {
				method: 'POST',
				body: JSON.stringify({ ...data, token })
			})
			setLoading(false)

			if (response.ok) {
				setView('thanks')
				return
			}

			const { status } = JSON.parse(response.message)
			setFormError(forgottenPasswordErrors(status))
		},
		[setLoading, token]
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
							Reset password
						</h1>
						<p className="text-pale">
							Please re-enter your email and a new password
						</p>
					</div>
					{formError && (
						<div className="p-4 mb-4 text-sm text-white bg-red-400 rounded-lg">
							{formError}
						</div>
					)}
					<form method="POST" onSubmit={handleSubmit(onSubmit)}>
						<fieldset>
							<Label htmlFor="email" text="Email" className="mb-4">
								<InputField
									type="email"
									placeholder="j.smith@gmail.com"
									autoComplete="username"
									icon="email"
									name="email"
									id="email"
									ref={register({ required: 'This field is required' })}
									error={errors.email}
								/>
							</Label>
							<Label
								htmlFor="password"
								text="New password"
								className="w-full mb-4"
							>
								<InputField
									className="w-full"
									id="password"
									name="password"
									type="password"
									placeholder="*******"
									ref={register({ required: 'This field is required' })}
									error={errors.password}
								/>
							</Label>
							<SubmitButton
								isLoading={isLoading}
								type="submit"
								className="w-full mb-8"
							>
								Change Passsword
							</SubmitButton>
							<p className="text-sm text-center text-gray-700">
								Do you know your password?{' '}
								<Link className="underline" to="/login/">
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
							Password updated
						</h1>
						<p className="text-pale">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
							ipsum dolor sit amet, consectetur adipiscing elit.
						</p>
					</div>

					<Button as={Link} to="/login/" className="w-full">
						Proceed to login
					</Button>
				</motion.div>
			</Switch>
		</AnimatePresence>
	)
}

FormNewPassword.propTypes = {
	token: string.isRequired
}

export default FormNewPassword
