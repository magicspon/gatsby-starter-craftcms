import React, { useState } from 'react'
import classNames from 'classnames'
import { string, object, number, func, bool } from 'prop-types'
import InputField from '@/components/InputField'
import Label from '@/components/Label'
import { OrganisationProvider } from '@/utils/OrganisationProvider'
import SchoolClassroomSelect from '@/components/SchoolClassroomSelect'
import Checkbox from '@/components/Checkbox'
import TermsSlideOut from '@/components/TermsSlideOut'
import SubmitButton from '@/components/SubmitButton'
import * as T from '@/types'

function FormStudentFields({
	first_name,
	last_name,
	isExisting = false,
	register,
	errors,
	email,
	organisations,
	id,
	setMode,
	isLoading,
	canCancel = false,
	organisation_id,
	classroom_id,
	showTerms = false,
	showSaveButton = false,
	addNewStudent
}) {
	const student = typeof id === 'number' ? `_${id}` : ''
	const [isOpen, setOpen] = useState(false)

	return (
		<>
			{isExisting && (
				<legend className="mb-6 text-lg font-sans-semi">
					Edit details: {first_name} {last_name}
				</legend>
			)}

			<p className="mb-4 text-sm text-pale">
				{isExisting
					? `Edit your child’s name, email address and schooling details below.`
					: 'An asterisk ( *) denotes a required field.'}
			</p>
			<Label
				htmlFor={`first_name${student}`}
				text="First Name *"
				className="w-full mb-4"
			>
				<InputField
					defaultValue={first_name}
					className="w-full"
					id={`first_name${student}`}
					name={`first_name${student}`}
					type="text"
					placeholder="John"
					ref={register({ required: 'This field is required' })}
					error={errors[`first_name${student}`]}
				/>
			</Label>
			<Label
				htmlFor={`last_name${student}`}
				text="Last Name *"
				className="w-full mb-4"
			>
				<InputField
					defaultValue={last_name}
					className="w-full"
					id={`last_name${student}`}
					name={`last_name${student}`}
					type="text"
					placeholder="Smith"
					ref={register({ required: 'This field is required' })}
					error={errors[`last_name${student}`]}
				/>
			</Label>
			<Label
				htmlFor={`email${student}`}
				text="Email Address"
				className="w-full mb-4"
			>
				<InputField
					defaultValue={email}
					autoComplete="username"
					className="w-full"
					id={`email${student}`}
					name={`email${student}`}
					type="email"
					ref={register}
					placeholder="j.smith@gmail.com"
					error={errors[`email${student}`]}
				/>
			</Label>
			<OrganisationProvider
				organisation_id={organisation_id}
				classroom_id={classroom_id}
				organisations={organisations}
			>
				<SchoolClassroomSelect
					register={register}
					student={student}
					errors={errors}
				/>
			</OrganisationProvider>
			{showTerms && (
				<div className={classNames({ 'mb-8': showSaveButton })}>
					<Checkbox
						ref={register}
						className="mb-2 text-pale"
						name={`terms${student}`}
						id={`terms${student}`}
						error={errors[`terms${student}`]}
					>
						I have read and agree to the terms and conditions.
					</Checkbox>
					<button
						type="button"
						onClick={() => setOpen(true)}
						className="text-pale focus:outline-none hocus:text-blue-600"
					>
						Click <span className="underline">here</span> to view.
					</button>
				</div>
			)}

			{showSaveButton && (
				<SubmitButton
					isLoading={isLoading}
					type="submit"
					className="w-full max-w-xs mb-3"
				>
					Save details
				</SubmitButton>
			)}

			{canCancel && (
				<div>
					<button
						type="button"
						onClick={() => {
							if (isExisting && id) {
								setMode('view')
							} else {
								addNewStudent(false)
							}
						}}
						className="text-sm text-gray-700 underline focus:outline-none hocus:text-blue-600"
					>
						Cancel
					</button>
				</div>
			)}

			<TermsSlideOut isOpen={isOpen} setOpen={setOpen} />
		</>
	)
}

FormStudentFields.propTypes = {
	first_name: string,
	last_name: string,
	isExisting: bool,
	register: func.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	errors: object,
	email: string,
	organisations: T.organisations,
	id: number,
	setMode: func,
	isLoading: bool,
	canCancel: bool,
	organisation_id: number,
	classroom_id: number,
	showTerms: bool,
	showSaveButton: bool,
	addNewStudent: func
}

export default FormStudentFields
