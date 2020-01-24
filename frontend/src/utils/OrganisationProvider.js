import React, { useState, createContext, useEffect } from 'react'
import { node, number } from 'prop-types'
import * as T from '@/types'
import useConstant from '@/hooks/useConstant'

const mapSelect = ({ id, name }) => ({ id, value: name })

export const OrganisationContext = createContext()

const placeholder = { value: 'select' }
export function OrganisationProvider({
	children,
	organisations,
	classroom_id,
	organisation_id
}) {
	const initial = useConstant(() => {
		const initialSchool = organisation_id
			? organisations.find(org => org.id === organisation_id)
			: false
		const initialClassroom =
			organisation_id && initialSchool
				? initialSchool.classrooms.find(room => room.id === classroom_id)
				: false

		return {
			school: initialSchool ? mapSelect(initialSchool) : placeholder,
			classrooms: initialSchool
				? initialSchool.classrooms.map(mapSelect)
				: organisations[0].classrooms.map(mapSelect),
			classroom: initialClassroom ? mapSelect(initialClassroom) : placeholder
		}
	})

	const [classrooms, setClassrooms] = useState(initial.classrooms)
	const [school, setSchool] = useState()
	const schools = useConstant(() => organisations.map(mapSelect))

	useEffect(() => {
		const match = organisations.find(org => org.id === parseInt(school, 10))
		if (match) {
			setClassrooms(match.classrooms.map(mapSelect))
		}
	}, [organisations, school])

	return (
		<OrganisationContext.Provider
			value={{
				classrooms,
				setClassrooms,
				schools,
				setAvailableSchools: setSchool,
				school: initial.school,
				classroom: initial.classroom
			}}
		>
			{children}
		</OrganisationContext.Provider>
	)
}

OrganisationProvider.propTypes = {
	organisations: T.organisations,
	children: node.isRequired,
	classroom_id: number,
	organisation_id: number
}
