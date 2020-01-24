import React, { useCallback } from 'react'
import { string } from 'prop-types'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import InputField from '@/components/InputField'
import Button from '@/components/Button'
import api from '@/utils/api'
// import { LOGIN } from '@/utils/endpoints'
import useProgressBar from '@/hooks/useProgressBar'

function FormNewsletter({ className }) {
	const { register, handleSubmit, errors } = useForm()
	const { setLoading } = useProgressBar()

	const onSubmit = useCallback(
		async data => {
			setLoading(true)

			await api('??', {
				method: 'POST',
				body: JSON.stringify({ email: data.newsletter_email })
			})

			setLoading(false)
		},
		[setLoading]
	)

	return (
		<form
			method="POST"
			onSubmit={handleSubmit(onSubmit)}
			className={classNames(className)}
		>
			<fieldset>
				<legend className="mb-4 text-black text-md font-sans-semi">
					Newsletter
				</legend>
				<div className="flex">
					<label htmlFor="newsletter_email" className="sr-only">
						Email address
					</label>
					<InputField
						type="email"
						name="newsletter_email"
						id="newsletter_email"
						placeholder="Email Address"
						className="flex-grow mr-2"
						ref={register({ required: 'This field is required' })}
						error={errors.newsletter_email}
					/>
					<Button as="button" type="submit">
						Subscribe
					</Button>
				</div>
			</fieldset>
		</form>
	)
}

FormNewsletter.propTypes = {
	className: string
}

export default FormNewsletter
