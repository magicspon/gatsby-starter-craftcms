import { useState, useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { values, compose, join, head, map, keys, forEach } from 'ramda'

function useFormErrors() {
	const [formError, setErrors] = useState()
	const { setError, clearError } = useForm()
	const errorRef = useRef()

	const setFormError = useCallback(
		messages => {
			if (messages === false) {
				clearError()
				setErrors(false)
				return
			}

			if (typeof messages === 'string') {
				setErrors(messages)
			}

			const errorMessages = compose(join(' '), map(head), values)(messages)
			compose(
				forEach(key => {
					setError(key, 'required', 'required')
				}),
				keys
			)(messages)

			if (typeof messages !== 'string') {
				setErrors(errorMessages)
			}

			if (errorRef) {
				const { top } = errorRef.current.getBoundingClientRect()

				window.scrollTo({
					top: top - 100 + window.pageYOffset,
					behavior: 'smooth'
				})
			}

			return errorMessages
		},
		[clearError, errorRef, setError]
	)

	return { errorRef, formError, setFormError }
}

export default useFormErrors
