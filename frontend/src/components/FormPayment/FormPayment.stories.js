import React from 'react'
import FormPayment from './FormPayment'

export default {
	title: 'forms|FormPayment',

	parameters: {
		component: FormPayment
	}
}

export const basic = () => (
	<FormPayment title="Your Details" intro="Enter your personal details below" />
)
