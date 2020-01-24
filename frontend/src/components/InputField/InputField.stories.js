import React from 'react'
import InputField from './InputField'

export default {
	title: 'fields|InputField',

	parameters: {
		component: InputField
	}
}

export const basic = () => <InputField type="text" placeholder="Full Name*" />

export const emailIcon = () => (
	<InputField type="email" placeholder="j.smith@gmail.com" icon="email" />
)

export const passwordIcon = () => (
	<InputField type="password" placeholder="********" icon="password" />
)
