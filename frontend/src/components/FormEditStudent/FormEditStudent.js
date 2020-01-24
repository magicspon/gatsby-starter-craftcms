import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { string, func, number } from 'prop-types'
import { useDispatch } from 'react-redux'
import { toPairs, compose, map, fromPairs, split, head } from 'ramda'
import Box from '@/components/Box'
import useProgressBar from '@/hooks/useProgressBar'
import Switch from '@/utils/Switch'
import { fade } from '@/utils/transitions'
import * as T from '@/types'
import StudentCard from '@/components/StudentCard'
import FormStudentFields from '@/components/FormStudentFields'
import { removeNullValues } from '@/utils'
import useFormErrors from '@/hooks/useFormErrors'
import FormError from '@/utils/FormError'

const toNum = num => parseInt(num, 10)
function FormEditStudent({
	className,
	id,
	email,
	first_name,
	last_name,
	organisation,
	classroom,
	donee_code,
	organisations,
	addNewStudent
}) {
	const { register, handleSubmit, errors } = useForm()
	const { isLoading, setLoading } = useProgressBar()
	const { errorRef, formError, setFormError } = useFormErrors()
	const isExisting = typeof first_name === 'string'
	const [mode, setMode] = useState(isExisting ? 'view' : 'edit')
	const dispatch = useDispatch()

	const onSubmit = useCallback(
		async data => {
			// the data keys might be suffixed with _{index}...
			// this needs to be tested for, and if its found
			// the keys need to be cleaned
			const testKey = Object.keys(data)[0]
			const testVal = testKey && testKey.match(/\d+/g)
			let postData = data

			if (testVal) {
				const [testId] = testVal
				postData = compose(
					fromPairs,
					map(([key, value]) => [
						compose(head, split(`_${testId}`))(key),
						value
					]),
					toPairs
				)(postData)
			}

			setLoading(true)
			setFormError(false)
			const { organisation_id, classroom_id } = postData
			const action = isExisting
				? 'user/REQUEST_EDIT_STUDENT'
				: 'user/REQUEST_ADD_STUDENT'

			const safeData = removeNullValues({
				...postData,
				organisation_id: toNum(organisation_id),
				classroom_id: toNum(classroom_id),
				id
			})

			const payload = isExisting ? safeData : [safeData]

			const response = await dispatch({
				type: action,
				payload: {
					postData: payload,
					id
				}
			})

			setLoading(false)

			if (response === true) {
				if (addNewStudent) addNewStudent(false)
				setMode('view')
				return
			}

			const { messages } = JSON.parse(response.message)
			setFormError(messages)
		},
		[addNewStudent, dispatch, id, isExisting, setFormError, setLoading]
	)

	return (
		<Box className={className}>
			<AnimatePresence exitBeforeEnter>
				<Switch test={mode}>
					<motion.div
						case={name => name !== 'edit'}
						variants={fade}
						initial="initial"
						animate="enter"
						exit="exit"
					>
						<FormError ref={errorRef} error={formError} />
						<StudentCard
							id={id}
							first_name={first_name}
							last_name={last_name}
							email={email}
							donee_code={donee_code}
							setMode={setMode}
							organisation={organisation}
							classroom={classroom}
						/>
					</motion.div>
					<motion.div
						case="edit"
						variants={fade}
						initial="initial"
						animate="enter"
						exit="exit"
					>
						<form
							method="POST"
							onSubmit={handleSubmit(onSubmit)}
							className="relative w-full pb-12"
						>
							<FormError ref={errorRef} error={formError} />
							<FormStudentFields
								first_name={first_name}
								last_name={last_name}
								isExisting={isExisting}
								register={register}
								errors={errors}
								email={email}
								organisations={organisations}
								setMode={setMode}
								isLoading={isLoading}
								canCancel
								organisation_id={organisation ? organisation.id : undefined}
								classroom_id={classroom ? classroom.id : undefined}
								showSaveButton
								addNewStudent={addNewStudent}
								showTerms={!!addNewStudent}
								id={id}
							/>
						</form>
					</motion.div>
				</Switch>
			</AnimatePresence>
		</Box>
	)
}

const studentType = { ...T.student, id: number }

FormEditStudent.propTypes = {
	className: string,
	organisations: T.organisations,
	...studentType,
	addNewStudent: func
}

export default FormEditStudent
