import React from 'react'
import FormLogin from './FormLogin'

export default {
	title: 'forms|FormLogin',

	parameters: {
		component: FormLogin
	}
}

export const basic = () => (
	<FormLogin
		title="Supporter login"
		legend="Login to view your past purchases"
		name="supporter"
		showCreateAccountLink
	/>
)
