import React from 'react'
import FormRegisterParent from './FormRegisterParent'

export default {
	title: 'forms|FormRegisterParent',

	parameters: {
		component: FormRegisterParent
	}
}

export const basic = () => <FormRegisterParent setPage={() => {}} />
