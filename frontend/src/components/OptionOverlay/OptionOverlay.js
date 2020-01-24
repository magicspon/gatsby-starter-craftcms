import React, { useState } from 'react'
import { string, arrayOf, number, shape, bool } from 'prop-types'
import classNames from 'classnames'
import Modal from '@/components/Modal'
import IconWrapper from '@/utils/IconWrapper'
import DownArrowIcon from '@/icons/chevron-down.svg'
import Link from '@/utils/Link'

function OptionOverlay({ schools, placeholder, active = true }) {
	const [isModalOpen, setModalOpen] = useState(false)
	const [school, setSchool] = useState(placeholder)
	const Tag = active ? 'button' : 'span'

	return (
		<>
			<h1 className="text-xl leading-tight text-center md:text-2xl font-sans-semi">
				I’m raising funds for{' '}
				<Tag
					type={active ? 'button' : undefined}
					onClick={() => {
						if (active) setModalOpen(true)
					}}
					className="inline-flex items-center text-blue-600 border-b-4 border-current transition-all focus:outline-none focus:text-blue-800"
				>
					<span>{school}</span>
					{active && (
						<IconWrapper
							icon={DownArrowIcon}
							className="flex-shrink-0 w-6 ml-5"
						/>
					)}
				</Tag>
			</h1>
			{active && (
				<Modal
					isModalOpen={isModalOpen}
					setModalOpen={setModalOpen}
					closeTimeoutMS={500}
					contentLabel="Select School modal"
					aria={{
						labelledby: 'select-school-heading',
						describedby: 'select-school-options'
					}}
				>
					<div className="w-full h-full max-w-xl mx-auto max-h-lg sm:max-h-2xl">
						<div className="flex flex-col w-full h-full py-8 overflow-hidden bg-white shadow-lg sm:py-12">
							<h3
								id="select-school-heading"
								className="px-8 mb-6 text-black text-md sm:text-xl xl:text-2xl font-sans-semi xl:mb-8 sm:px-12 xl:px-16"
							>
								Select your school
							</h3>
							<ul
								id="select-school-options"
								className="w-full h-full overflow-auto"
							>
								{schools.map(({ id, name, uri }) => (
									<li
										className="px-8 mb-2 sm:px-12 xl:px-16 last:mb-0"
										key={id}
									>
										<Link
											className={classNames(
												'text-md sm:text-xl xl:text-2xl font-sans-semi  transition-color leading-tight focus:outline-none',
												{
													'text-blue-600 hocus:text-blue-800 ': school === name,
													'text-gray-300 hocus:text-blue-600 ': school !== name
												}
											)}
											to={uri}
											onClick={() => {
												setSchool(name)
												setModalOpen(false)
											}}
										>
											{name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</Modal>
			)}
		</>
	)
}

OptionOverlay.propTypes = {
	schools: arrayOf(
		shape({
			id: number.isRequired,
			name: string.isRequired
		})
	).isRequired,
	placeholder: string.isRequired,
	active: bool
}

export default OptionOverlay
