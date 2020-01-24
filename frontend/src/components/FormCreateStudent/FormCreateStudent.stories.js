import React from 'react'
import FormCreateStudent from './FormCreateStudent'

export default {
	title: 'forms|FormCreateStudent',

	parameters: {
		component: FormCreateStudent
	}
}

export const basic = () => <FormCreateStudent setPage={() => {}} />
