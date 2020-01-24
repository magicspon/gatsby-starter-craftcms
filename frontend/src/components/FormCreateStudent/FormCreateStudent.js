import React, {
	useContext,
	useEffect,
	useCallback,
	useState,
	useReducer,
	useRef
} from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { navigate } from 'gatsby'
import { compose, match, head, map, groupBy, toPairs } from 'ramda'
import { useDispatch } from 'react-redux'
import { ThemeContext } from '@/container/ThemeProvider'
import Button from '@/components/Button'
import Box from '@/components/Box'
import useProgressBar from '@/hooks/useProgressBar'
import IconWrapper from '@/utils/IconWrapper'
import DeleteIcon from '@/icons/delete.svg'
const AnimatableBox = motion.custom(Box)
import { fade } from '@/utils/transitions'
import * as T from '@/types'
import FormStudentFields from '@/components/FormStudentFields'
import SubmitButton from '@/components/SubmitButton'
import usePrevious from '@/hooks/usePrevious'

function reducer(state, { type, payload }) {
	switch (type) {
		case 'ADD_STUDENT': {
			const id = state.id + 1
			return { ...state, id, students: [...state.students, id] }
		}

		case 'SET_STUDENT_ERROR': {
			const id = state.id + 1
			return { ...state, id, students: [...state.students, id] }
		}

		case 'REMOVE_STUDENT': {
			return {
				...state,
				students: state.students.filter(item => item !== payload)
			}
		}

		default:
			throw new Error()
	}
}

const toNum = num => parseInt(num, 10)

function FormCreateStudent({ organisations }) {
	const { setTheme } = useContext(ThemeContext)
	const { register, handleSubmit, errors, setError } = useForm()
	const { isLoading, setLoading } = useProgressBar()
	// an array of errors
	const [formErrors, setFormErrors] = useState([])
	const dispatch = useDispatch()
	const formRefs = useRef([])

	const [{ students }, update] = useReducer(reducer, {
		students: [0],
		id: 0
	})

	const prevStudents = usePrevious(students && students.length)

	const onSubmit = useCallback(
		async data => {
			const postData = students.map(student => {
				const item = {
					first_name: data[`first_name_${student}`],
					last_name: data[`last_name_${student}`],
					organisation_id: toNum(data[`organisation_id_${student}`]),
					classroom_id: toNum(data[`classroom_id_${student}`]),
					terms: data[`terms_${student}`]
				}

				if (!data[`email_${student}`]) {
					return item
				}

				return {
					...item,
					email: data[`email_${student}`]
				}
			})
			// reset the error messages
			setFormErrors([])
			setLoading(true)

			const response = await dispatch({
				type: 'user/REQUEST_ADD_STUDENT',
				payload: { postData }
			})

			if (response === true) {
				navigate('/students/')
				return
			}

			setLoading(false)
			const { messages } = JSON.parse(response.message)

			const errorMessages = compose(
				groupBy(v => v.id),
				map(([key, value]) => {
					const id = compose(head, match(/\d+/g))(key)
					const [, rule] = key.split(`${id}.`)
					return {
						id,
						rule,
						error: value[0]
					}
				}),
				toPairs
			)(messages)

			// the errors returned will be index based
			// we have a list of students, get the index
			// from each, and check to see if there is an
			// error with the same index
			// if there is, call the error function, and return a
			// string of error messages
			// if there is not, return null
			const issues = students.map((student, index) => {
				if (errorMessages[index]) {
					errorMessages[index].forEach(({ rule, error, id }) => {
						setError(`${rule}_${id}`, error)
					})

					return errorMessages[index].map(e => e.error).join(' ')
				}
				return null
			})

			setFormErrors(issues)
		},
		[dispatch, setError, setLoading, students]
	)

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	useEffect(() => {
		const total = students && students.length
		if (prevStudents !== total && prevStudents) {
			const target = formRefs.current[total - 1]
			if (target) {
				const { top } = target.getBoundingClientRect()
				window.scrollTo({
					top: top - 100 + window.pageYOffset,
					behavior: 'smooth'
				})
			}
		}
	}, [students, prevStudents])

	return (
		<form
			method="POST"
			onSubmit={handleSubmit(onSubmit)}
			className="w-full pb-12"
		>
			<AnimatePresence>
				{students.map((student, index) => (
					<AnimatableBox
						variants={fade}
						initial="initial"
						animate="enter"
						exit="exit"
						positionTransition={{
							duration: 0.5,
							ease: [0.43, 0.13, 0.23, 0.96]
						}}
						key={student}
						as="fieldset"
						className="relative mb-12"
						ref={node => {
							formRefs.current[index] = node
						}}
					>
						{students.length > 1 && (
							<IconWrapper
								icon={DeleteIcon}
								as="button"
								type="button"
								className="absolute w-3 top-4 right-4"
								onClick={() => {
									update({ type: 'REMOVE_STUDENT', payload: student })
								}}
							/>
						)}
						<FormStudentFields
							formError={formErrors[index]}
							register={register}
							errors={errors}
							organisations={organisations}
							isLoading={isLoading}
							id={student}
							showTerms
						/>
					</AnimatableBox>
				))}
			</AnimatePresence>
			<Button
				disabled={isLoading}
				type="button"
				className="w-full max-w-xs mb-4"
				theme="secondary"
				onClick={() => {
					update({ type: 'ADD_STUDENT' })
				}}
			>
				Add another student
			</Button>

			<SubmitButton
				isLoading={isLoading}
				type="submit"
				className="w-full max-w-xs"
			>
				Register
			</SubmitButton>
		</form>
	)
}

FormCreateStudent.propTypes = {
	organisations: T.organisations
}

export default FormCreateStudent
