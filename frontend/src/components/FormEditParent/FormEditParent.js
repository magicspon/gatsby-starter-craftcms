import React, { useContext, useEffect, useCallback } from 'react'
import { string } from 'prop-types'
import { useForm } from 'react-hook-form'
import { navigate } from 'gatsby'
import { useDispatch } from 'react-redux'
import { ThemeContext } from '@/container/ThemeProvider'
import InputField from '@/components/InputField'
import Box from '@/components/Box'
import Label from '@/components/Label'
import useProgressBar from '@/hooks/useProgressBar'
import SubmitButton from '@/components/SubmitButton'
import useFormErrors from '@/hooks/useFormErrors'
import FormError from '@/utils/FormError'

function FormEditParent({ first_name, last_name, email }) {
	const { setTheme } = useContext(ThemeContext)
	const { register, handleSubmit, errors } = useForm()
	const { isLoading, setLoading } = useProgressBar()
	const { errorRef, formError, setFormError } = useFormErrors()
	const dispatch = useDispatch()

	const onSubmit = useCallback(
		async data => {
			setLoading(true)
			setFormError(false)

			const response = await dispatch({
				type: 'user/REQUEST_UPDATE_PARENT',
				payload: data
			})

			if (response === true) {
				navigate('/students/')
				return
			}

			setLoading(false)
			const { messages } = JSON.parse(response.message)
			setFormError(messages)
		},
		[dispatch, setFormError, setLoading]
	)

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	return (
		<form method="POST" onSubmit={handleSubmit(onSubmit)} className="pb-12">
			<FormError ref={errorRef} error={formError} />
			<Box as="fieldset" className="mb-12">
				<p className="mb-4 text-sm text-pale">
					An asterisk ( *) denotes a required field.
				</p>
				<Label htmlFor="first_name" text="First Name *" className="w-full mb-4">
					<InputField
						defaultValue={first_name}
						className="w-full"
						id="first_name"
						name="first_name"
						type="text"
						placeholder="John"
						ref={register({ required: 'This field is required' })}
						error={errors.first_name}
					/>
				</Label>
				<Label htmlFor="last_name" text="Last Name *" className="w-full mb-4">
					<InputField
						defaultValue={last_name}
						className="w-full"
						id="last_name"
						name="last_name"
						type="text"
						placeholder="Smith"
						ref={register({ required: 'This field is required' })}
						error={errors.last_name}
					/>
				</Label>
				<Label htmlFor="email" text="Email Address*" className="w-full mb-4">
					<InputField
						defaultValue={email}
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
					htmlFor="current_password"
					text="Confirm password *"
					className="w-full mb-4"
				>
					<InputField
						className="w-full"
						id="current_password"
						name="current_password"
						type="password"
						autoComplete="new-password"
						ref={register({
							required: 'This field is required',
							minLength: 6
						})}
						error={errors.current_password}
					/>
				</Label>
			</Box>

			<SubmitButton
				isLoading={isLoading}
				type="submit"
				className="w-full max-w-xs"
			>
				Update
			</SubmitButton>
		</form>
	)
}

FormEditParent.propTypes = {
	first_name: string,
	last_name: string,
	email: string
}

export default FormEditParent
