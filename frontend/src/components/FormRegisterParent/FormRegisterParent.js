import React, { useContext, useEffect, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeContext } from '@/container/ThemeProvider'
import Button from '@/components/Button'
import InputField from '@/components/InputField'
import Box from '@/components/Box'
import Label from '@/components/Label'
import api from '@/utils/api'
import { REGISTER } from '@/utils/endpoints'
import useProgressBar from '@/hooks/useProgressBar'
import { fade } from '@/utils/transitions'
import Switch from '@/utils/Switch'
import RichText from '@/utils/RichText'
import Link from '@/utils/Link'
import SubmitButton from '@/components/SubmitButton'
import useFormErrors from '@/hooks/useFormErrors'
import FormError from '@/utils/FormError'

function FormRegisterParent() {
	const { setTheme } = useContext(ThemeContext)
	const [view, setView] = useState('form')
	const { register, handleSubmit, errors, getValues } = useForm()
	const { isLoading, setLoading } = useProgressBar()
	const { errorRef, formError, setFormError } = useFormErrors()

	const onSubmit = useCallback(
		async data => {
			setLoading(true)
			setFormError(false)
			const response = await api(REGISTER, {
				method: 'POST',
				body: JSON.stringify({ ...data, type: 'parent' }),
				headers: {
					'Content-Type': 'text/plain'
				}
			})

			setLoading(false)

			if (response.status >= 200 && response.status < 300) {
				setView('thanks')
				return
			}

			const { messages } = JSON.parse(response.message)
			setFormError(messages)
		},
		[setFormError, setLoading]
	)

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	return (
		<AnimatePresence exitBeforeEnter>
			<Switch test={view}>
				<motion.div
					case="form"
					variants={fade}
					initial="initial"
					animate="enter"
					exit="exit"
					className="md:flex md:justify-between"
				>
					<div className="md:w-2/5">
						<Box>
							<h3 className="mb-6 text-xl leading-tight font-sans-semi md:text-2xl">
								Student Registration
							</h3>
							<RichText className="mb-8">
								<p className="text-pale">
									To register your child with GoodGive, you must be a
									parent/guardian of the relevant child and complete the steps
									below:
								</p>
								<ol className="pl-4 list-decimal">
									<li className="mb-4">Create an account with your details</li>
									<li>
										Create an account for each of your children with their
										respective schools
									</li>
								</ol>
							</RichText>

							<p className="mb-6 text-md font-sans-semi md:text-xl">
								Already have an account?
							</p>
							<Button as={Link} to="/login/parents/" className="w-full">
								Login
							</Button>
						</Box>
					</div>
					<form
						method="POST"
						onSubmit={handleSubmit(onSubmit)}
						className="pb-12 md:w-1/2"
					>
						<FormError ref={errorRef} error={formError} />
						<Box as="fieldset" className="mb-12">
							<h2 className="mb-4 text-lg lg:text-xl font-sans-semi">
								Parent/Guardian
							</h2>
							<p className="mb-4 text-sm text-pale">
								An asterisk ( *) denotes a required field.
							</p>
							<Label
								htmlFor="first_name"
								text="First Name *"
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
								text="Last Name *"
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
							<Label
								htmlFor="email"
								text="Email Address*"
								className="w-full mb-4"
							>
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
							<Label
								htmlFor="phone"
								text="Phone number*"
								className="w-full mb-4"
							>
								<InputField
									autoComplete="username"
									className="w-full"
									id="phone"
									name="phone"
									type="tel"
									placeholder="01234567890"
									ref={register({ required: 'This field is required' })}
									error={errors.phone}
								/>
							</Label>
						</Box>
						<Box as="fieldset" className="mb-8">
							<h2 className="mb-4 text-lg lg:text-xl font-sans-semi">
								Password
							</h2>
							<p className="mb-4 text-sm text-pale">
								An asterisk ( *) denotes a required field.
							</p>
							<Label
								htmlFor="password"
								text="Password *"
								className="w-full mb-4"
							>
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
							<Label
								htmlFor="confirm_password"
								text="Confirm password* "
								className="w-full mb-4"
							>
								<InputField
									className="w-full"
									id="confirm_password"
									name="confirm_password"
									type="password"
									ref={register({
										validate: value => value === getValues().password
									})}
									error={errors.confirm_password}
								/>
							</Label>
						</Box>

						<SubmitButton
							isLoading={isLoading}
							type="submit"
							className="w-full max-w-xs"
						>
							Submit
						</SubmitButton>
					</form>
				</motion.div>
				<motion.div
					case="thanks"
					variants={fade}
					initial="initial"
					animate="enter"
					exit="exit"
					className="flex justify-center"
				>
					<Box className="w-full max-w-xl mx-auto">
						<div className="mb-8">
							<h1 className="mb-4 leading-tight text-md md:text-xl font-sans-semi">
								Thanks for signing up
							</h1>
							<p className="text-pale">
								Please check your email (and spam) for an an account activation
								link which you'll receive shortly.
							</p>
						</div>
					</Box>
				</motion.div>
			</Switch>
		</AnimatePresence>
	)
}

export default FormRegisterParent
