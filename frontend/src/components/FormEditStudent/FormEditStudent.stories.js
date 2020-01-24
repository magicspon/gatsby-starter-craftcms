import React from 'react'
import FormEditStudent from './FormEditStudent'

export default {
	title: 'forms|FormEditStudent',

	parameters: {
		component: FormEditStudent
	}
}

export const basic = () => (
	<FormEditStudent
		email="student@example.com"
		first_name="John"
		last_name="Smith"
		organisation_id={1}
		classroom_id={1}
		id={1}
	/>
)
