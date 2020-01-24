import React from 'react'
import { Elements } from 'react-stripe-elements'
import InputCreditCard from './InputCreditCard'

export default {
	title: 'fields|InputCreditCard',

	parameters: {
		component: InputCreditCard
	}
}

export const basic = () => (
	<Elements>
		<InputCreditCard errors={{}} />
	</Elements>
)
