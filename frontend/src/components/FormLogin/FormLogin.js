import React, { useCallback, useState, forwardRef } from 'react'
import { string, bool, oneOfType, func } from 'prop-types'
import { navigate } from 'gatsby'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import Link from '@/utils/Link'
import Box from '@/components/Box'
import InputField from '@/components/InputField'
import Label from '@/components/Label'
import useProgressBar from '@/hooks/useProgressBar'
import SubmitButton from '@/components/SubmitButton'
import { loginErrors } from '@/utils/errors'

const FormLogin = forwardRef(
	(
		{
			title,
			legend,
			name,
			showCreateAccountLink,
			createUrl = '/register/',
			redirect,
			className,
			setView,
			onProductLogin
		},
		ref
	) => {
		const { register, handleSubmit, errors } = useForm()
		const [formError, setFormError] = useState()
		const { isLoading, setLoading } = useProgressBar()
		const dispatch = useDispatch()

		const onSubmit = useCallback(
			async data => {
				setLoading(true)
				setFormError(false)

				const response = await dispatch({
					type: 'user/REQUEST_LOGIN',
					payload: {
						email: data[`${name}_email`],
						password: data[`${name}_password`],
						redirect
					}
				})
				const { error } = response

				if (response.success) {
					// after logging in from the product page
					if (onProductLogin) {
						onProductLogin()
						return
					}

					if (response.redirect) {
						setTimeout(() => {
							navigate(response.redirect)
						})
					}
					return
				}
				setLoading(false)

				const { status } = JSON.parse(error)

				setFormError(loginErrors(status))
			},
			[dispatch, name, onProductLogin, redirect, setLoading]
		)

		return (
			<>
				{title && (
					<h2 className="mb-8 text-xl text-center font-sans-semi">{title}</h2>
				)}
				<Box ref={ref} className={classNames('lg:flex-grow', className)}>
					{formError && (
						<div className="p-4 mb-4 text-sm text-white bg-red-400 rounded-lg">
							{formError}
						</div>
					)}
					<form method="POST" onSubmit={handleSubmit(onSubmit)}>
						{legend && (
							<legend className="block mb-8 text-center font-sans-semi text-md">
								{legend}
							</legend>
						)}
						<fieldset className="mb-8">
							<Label htmlFor={`${name}_email`} text="Email" className="mb-4">
								<InputField
									type="email"
									placeholder="j.smith@gmail.com"
									autoComplete="username"
									icon="email"
									name={`${name}_email`}
									id={`${name}_email`}
									ref={register({ required: 'This field is required' })}
									error={errors[`${name}_email`]}
								/>
							</Label>
							<Label
								htmlFor={`${name}_password`}
								text="Password"
								className="mb-4"
							>
								<InputField
									type="password"
									placeholder="********"
									autoComplete="current-password"
									icon="password"
									name={`${name}_password`}
									id={`${name}_password`}
									ref={register({ required: 'This field is required' })}
									error={errors[`${name}_password`]}
								/>
							</Label>
							<SubmitButton
								isLoading={isLoading}
								className="w-full"
								type="submit"
							>
								Login
							</SubmitButton>
						</fieldset>
						<div className="text-sm text-center text-pale">
							<div>
								<Link to="/forgotten-password/" className="hover:underline">
									Forgot your password?
								</Link>
							</div>
							{showCreateAccountLink && (
								<Link
									to={createUrl}
									onClick={e => {
										if (setView) {
											e.preventDefault()
											setView('create')
										}
									}}
									className="underline"
								>
									Create your account
								</Link>
							)}
						</div>
					</form>
				</Box>
			</>
		)
	}
)

FormLogin.propTypes = {
	title: string,
	legend: string,
	name: string.isRequired,
	showCreateAccountLink: bool,
	createUrl: string,
	redirect: oneOfType([bool, string]),
	className: string,
	setView: func,
	onProductLogin: func
}

export default FormLogin
