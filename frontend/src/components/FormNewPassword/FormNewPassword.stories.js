import React from 'react'
import FormNewPassword from './FormNewPassword'

export default {
	title: 'forms|FormNewPassword',

	parameters: {
		component: FormNewPassword
	}
}

export const basic = () => <FormNewPassword token="hello" />
