import React, { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import InputField from '@/components/InputField'
import Label from '@/components/Label'
import Button from '@/components/Button'
import api from '@/utils/api'
import { FORGOTTEN_PASSWORD } from '@/utils/endpoints'
import useProgressBar from '@/hooks/useProgressBar'
import Switch from '@/utils/Switch'
import { fade } from '@/utils/transitions'
import Link from '@/utils/Link'
import SubmitButton from '@/components/SubmitButton'
import { forgottenPasswordErrors } from '@/utils/errors'

function FormResetPassword() {
	const { register, handleSubmit, errors } = useForm()
	const { isLoading, setLoading } = useProgressBar()
	const [view, setView] = useState('form')
	const [formError, setFormError] = useState()

	const onSubmit = useCallback(
		async data => {
			setLoading(true)
			setFormError(false)

			const response = await api(FORGOTTEN_PASSWORD, {
				method: 'POST',
				body: JSON.stringify(data)
			})

			setLoading(false)

			if (response.status >= 200 && response.status < 300) {
				setView('thanks')
				return
			}

			const { status } = JSON.parse(response.message)
			setFormError(forgottenPasswordErrors(status))
		},
		[setFormError, setLoading]
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
							Forgot your password?
						</h1>
						<p className="text-pale"> Enter your details below</p>
					</div>
					{formError && (
						<div className="p-4 mb-4 text-sm text-white bg-red-400 rounded-lg">
							{formError}
						</div>
					)}
					<form method="POST" onSubmit={handleSubmit(onSubmit)}>
						<fieldset>
							<Label htmlFor="email" text="Email" className="w-full mb-4">
								<InputField
									className="w-full"
									id="email"
									name="email"
									type="email"
									placeholder="j.smith@gmail.com"
									ref={register({ required: 'This field is required' })}
									error={errors.email}
								/>
							</Label>
							<SubmitButton
								isLoading={isLoading}
								type="submit"
								className="w-full mb-8"
							>
								Reset Passsword
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
							Please check your email
						</h1>
						<p className="text-pale">
							A link to reset your password has been sent to your email address
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

export default FormResetPassword
