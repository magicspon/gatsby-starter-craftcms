import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { func, number } from 'prop-types'
import Button from '@/components/Button'
import Box from '@/components/Box'
import useProgressBar from '@/hooks/useProgressBar'
import Modal from '@/components/Modal'
import FormAddStudentEmail from '@/components/FormAddStudentEmail'
import * as T from '@/types'
import Switch from '@/utils/Switch'

function StudentCard({
	id,
	first_name,
	last_name,
	email,
	donee_code,
	organisation,
	classroom,
	setMode
}) {
	const dispatch = useDispatch()
	const { isLoading, setLoading } = useProgressBar()
	const [isOpen, setOpen] = useState(false)
	const [view, setView] = useState('email')
	return (
		<>
			<h3 className="mb-5 text-lg font-sans-medium">
				{first_name} {last_name}
			</h3>
			<ul className="mb-5 text-md">
				{organisation && <li>{organisation.name}</li>}
				{classroom && <li>Classroom: {classroom.name}</li>}
				{email || (
					<li>
						<button
							className="underline focus:outline-none hocus:text-blue-600"
							id="add-student-email"
							type="button"
							onClick={() => {
								setView('email')
								setOpen(true)
							}}
						>
							Add student email address
						</button>
					</li>
				)}
			</ul>
			<h4 className="mb-4 text-lg font-sans-medium">
				Fundraising code: {donee_code}
			</h4>
			{/* <div className="mb-12 text-md">Valid til Dec 31 2019</div> */}
			<Button
				type="button"
				as="button"
				theme="secondary"
				className="w-full max-w-sm mb-3"
				onClick={() => setMode('edit')}
			>
				Edit details
			</Button>
			<div>
				<button
					type="button"
					disabled={isLoading}
					onClick={() => {
						setView('delete')
						setOpen(true)
					}}
					className="text-gray-700 underline text-md focus:outline-none hocus:text-blue-600"
				>
					Disable/remove profile
				</button>
			</div>

			<Modal
				overlayClassName="fixez inset-0 w-full flex items-center"
				aria={{
					labelledby: 'add-student-email',
					describedby: 'select-student-email'
				}}
				isModalOpen={isOpen}
				setModalOpen={setOpen}
				contentLabel="Add student email address"
				className="flex items-center justify-center w-full max-w-lg mx-auto"
			>
				<Switch test={view}>
					<FormAddStudentEmail
						case="email"
						studentId={id}
						setOpen={setOpen}
						id="select-student-email"
					/>
					<Box case="delete" className="shadow">
						<h2 className="mb-8 text-lg font-sans-medium">
							Are you sure you want to remove {first_name} {last_name}
						</h2>
						<div className="lg:flex lg:-ml-4">
							<div className="mb-6 lg:mb-0 lg:pl-4 lg:w-1/2">
								<Button
									as="button"
									type="button"
									className="w-full"
									onClick={async () => {
										setLoading(true)
										await dispatch({
											type: 'user/REQUEST_REMOVE_STUDENT',
											payload: { id }
										})
										setLoading(false)
										setOpen(false)
									}}
								>
									Confirm
								</Button>
							</div>
							<div className="lg:pl-4 lg:w-1/2">
								<Button
									as="button"
									type="button"
									theme="secondary"
									className="w-full"
									onClick={() => {
										setOpen(false)
									}}
								>
									Cancel
								</Button>
							</div>
						</div>
					</Box>
				</Switch>
			</Modal>
		</>
	)
}

const studentType = { ...T.student, id: number }

StudentCard.propTypes = {
	...studentType,
	setMode: func.isRequired
}

export default StudentCard
