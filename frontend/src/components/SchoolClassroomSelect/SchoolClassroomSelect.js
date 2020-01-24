import React, { useContext } from 'react'
import { string, object, func } from 'prop-types'
import Label from '@/components/Label'
import Select from '@/components/Select'
import { OrganisationContext } from '@/utils/OrganisationProvider'

function SchoolClassroomSelect({ register, student, errors }) {
	const {
		classrooms,
		schools,
		setAvailableSchools,
		school,
		classroom
	} = useContext(OrganisationContext)

	return (
		<>
			<Label
				htmlFor={`organisation_id${student}`}
				text="School *"
				className="w-full mb-4"
			>
				<Select
					name={`organisation_id${student}`}
					id={`organisation_id${student}`}
					defaultValue={school.id}
					options={schools}
					ref={register({
						required: 'This field is required',
						validate: value => value !== 'select'
					})}
					onChange={({ target }) => {
						setAvailableSchools(target.value)
					}}
					error={errors[`organisation_id${student}`]}
				/>
			</Label>
			<Label
				htmlFor={`classroom_id${student}`}
				text="Classroom *"
				className="w-full mb-10"
			>
				<Select
					name={`classroom_id${student}`}
					id={`classroom_id${student}`}
					defaultValue={classroom.id}
					options={classrooms}
					ref={register({
						required: 'This field is required',
						validate: value => value !== 'select'
					})}
					error={errors[`classroom_id${student}`]}
				/>
			</Label>
		</>
	)
}

SchoolClassroomSelect.propTypes = {
	register: func.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	errors: object,
	student: string
}

export default SchoolClassroomSelect
