import React, { useState } from 'react'
import Modal from './Modal'

export default {
	title: 'ui|Modal',

	parameters: {
		component: Modal
	}
}

export const basic = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [isModalOpen, setModalOpen] = useState(false)

	return (
		<div>
			<button type="button" onClick={() => setModalOpen(!isModalOpen)}>
				toggle
			</button>
			<Modal
				aria={{
					labelledby: 'select-school-heading',
					describedby: 'select-school-options'
				}}
				isModalOpen={isModalOpen}
				setModalOpen={setModalOpen}
				contentLabel="Select School modal"
			>
				Contents
			</Modal>
		</div>
	)
}
