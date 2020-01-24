import React, { useCallback } from 'react'
import { string } from 'prop-types'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import InputField from '@/components/InputField'
import IconWrapper from '@/utils/IconWrapper'
import ArrowIcon from '@/icons/arrow.svg'
import api from '@/utils/api'
import SubmitButton from '@/components/SubmitButton'
// import { LOGIN } from '@/utils/endpoints'
import useProgressBar from '@/hooks/useProgressBar'

function FormTellAFriend({ className }) {
	const { register, handleSubmit, errors } = useForm()
	const { isLoading, setLoading } = useProgressBar()

	const onSubmit = useCallback(
		async data => {
			setLoading(true)

			await api('??', {
				method: 'POST',
				body: JSON.stringify({
					email: data.friend_email,
					name: data.friend_name
				})
			})

			setLoading(false)
		},
		[setLoading]
	)

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			method="post"
			className={classNames(className)}
		>
			<legend className="mb-4 text-xl leading-tight text-black md:text-2xl font-sans-semi">
				Help spread the word
			</legend>
			<p className="mb-8 md:text-md">
				Thinking of someone else who can help contribute?
			</p>
			<div className="lg:flex">
				<label htmlFor="friend_name" className="sr-only">
					Name
				</label>
				<InputField
					type="email"
					name="friend_name"
					id="friend_name"
					placeholder="name"
					className="mb-4 lg:mr-2 lg:mb-0"
					ref={register({ required: 'This field is required' })}
					error={errors.friend_name}
				/>
				<label htmlFor="friend_email" className="sr-only">
					Email address
				</label>
				<InputField
					type="email"
					name="friend_email"
					id="friend_email"
					placeholder="Email Address"
					className="flex-grow mb-4 lg:mr-2 lg:mb-0"
					ref={register({ required: 'This field is required' })}
					error={errors.friend_email}
				/>
				<SubmitButton
					isLoading={isLoading}
					as="button"
					type="submit"
					className="flex-shrink-0 w-full lg:w-auto"
				>
					Tell a friend
					<IconWrapper icon={ArrowIcon} className="w-4 ml-4" />
				</SubmitButton>
			</div>
		</form>
	)
}

FormTellAFriend.propTypes = {
	className: string
}

export default FormTellAFriend
