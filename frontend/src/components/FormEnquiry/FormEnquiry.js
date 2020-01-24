import React, { useCallback, useState } from 'react'
import { string } from 'prop-types'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import SubmitButton from '@/components/SubmitButton'
import InputField from '@/components/InputField'
import Label from '@/components/Label'
import useProgressBar from '@/hooks/useProgressBar'
import api from '@/utils/api'
import { ENQUIRY_FORM } from '@/utils/endpoints'
import useFormErrors from '@/hooks/useFormErrors'
import FormError from '@/utils/FormError'
import Switch from '@/utils/Switch'
import { fade } from '@/utils/transitions'

function FormEnquiry({ heading }) {
	const { register, handleSubmit, errors } = useForm()
	const { errorRef, formError, setFormError } = useFormErrors()
	const { isLoading, setLoading } = useProgressBar()
	const [view, setView] = useState('form')

	const onSubmit = useCallback(
		async data => {
			setLoading(true)
			setFormError(false)

			const response = await api(ENQUIRY_FORM, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'text/plain',
					Accept: '*'
				}
			})

			setLoading(false)

			if (response.status >= 200 && response.status < 300) {
				// after logging in from the product page
				setView('thanks')
				return
			}

			const { messages } = JSON.parse(response.message)
			setFormError(messages)
		},
		[setFormError, setLoading]
	)

	return (
		<AnimatePresence exitBeforeEnter>
			<Switch test={view}>
				<motion.form
					variants={fade}
					initial="initial"
					animate="enter"
					exit="exit"
					case="form"
					method="POST"
					onSubmit={handleSubmit(onSubmit)}
				>
					<FormError ref={errorRef} error={formError} />
					<legend className="block mb-4 font-sans-semi text-md">
						{heading}
					</legend>
					<fieldset>
						<Label htmlFor="first_name" text="Name *" className="mb-4">
							<InputField
								type="text"
								placeholder="Name"
								autoComplete="name"
								name="first_name"
								id="first_name"
								ref={register({ required: 'This field is required' })}
								error={errors.first_name}
							/>
						</Label>
						<Label htmlFor="organisation" text="School *" className="mb-4">
							<InputField
								type="text"
								placeholder="School"
								name="organisation"
								id="organisation"
								ref={register({ required: 'This field is required' })}
								error={errors.organisation}
							/>
						</Label>
						<Label htmlFor="email" text="Email *" className="mb-4">
							<InputField
								type="email"
								placeholder="Name"
								name="email"
								id="email"
								ref={register({ required: 'This field is required' })}
								error={errors.email}
							/>
						</Label>
						<Label htmlFor="message" text="Enquiry *" className="mb-4">
							<textarea
								name="message"
								id="message"
								className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500"
								rows="5"
								ref={register({ required: 'This field is required' })}
							/>
						</Label>
						<SubmitButton
							isLoading={isLoading}
							className="w-full"
							type="submit"
						>
							Submit
						</SubmitButton>
					</fieldset>
				</motion.form>
				<motion.div
					variants={fade}
					initial="initial"
					animate="enter"
					exit="exit"
					case="thanks"
				>
					<div className="mb-8">
						<h1 className="mb-4 leading-tight text-md md:text-xl font-sans-semi">
							Thanks!
						</h1>
						<p className="text-pale">
							We'll be in touch shortly regarding your enquiry
						</p>
					</div>
				</motion.div>
			</Switch>
		</AnimatePresence>
	)
}

FormEnquiry.propTypes = {
	heading: string.isRequired
}

export default FormEnquiry
