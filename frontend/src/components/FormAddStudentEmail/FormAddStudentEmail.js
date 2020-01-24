import React, { useCallback } from 'react'
import { string, number, func } from 'prop-types'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Box from '@/components/Box'
import SubmitButton from '@/components/SubmitButton'
import InputField from '@/components/InputField'
import Label from '@/components/Label'
import useProgressBar from '@/hooks/useProgressBar'
import useFormErrors from '@/hooks/useFormErrors'
import FormError from '@/utils/FormError'

function FormAddStudentEmail({ id, className, studentId, setOpen }) {
	const { register, handleSubmit, errors } = useForm()
	const dispatch = useDispatch()
	const { isLoading, setLoading } = useProgressBar()
	const { errorRef, formError, setFormError } = useFormErrors()
	const onSubmit = useCallback(
		async data => {
			const { email } = data
			setLoading(true)
			setFormError(false)
			const response = await dispatch({
				type: 'user/REQUEST_SET_STUDENT_EMAIL',
				payload: { email, id: studentId }
			})

			if (response === true) {
				setOpen(false)
			}

			setLoading(false)
			const { messages } = JSON.parse(response.message)
			setFormError(messages)
		},
		[dispatch, setFormError, setLoading, setOpen, studentId]
	)

	return (
		<Box id={id} className={classNames(className, 'bg-white w-full shadow')}>
			<form method="POST" onSubmit={handleSubmit(onSubmit)}>
				<FormError error={formError} ref={errorRef} />
				<Label htmlFor="email" text="Email Address" className="w-full mb-4">
					<InputField
						autoComplete="username"
						className="w-full"
						id="email"
						name="email"
						type="email"
						ref={register}
						placeholder="j.smith@gmail.com"
						error={errors.email}
					/>
				</Label>
				<SubmitButton isLoading={isLoading} className="w-full" type="submit">
					Save
				</SubmitButton>
			</form>
		</Box>
	)
}

FormAddStudentEmail.propTypes = {
	className: string,
	id: string,
	studentId: number,
	setOpen: func.isRequired
}

export default FormAddStudentEmail
