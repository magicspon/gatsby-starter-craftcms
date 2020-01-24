import React from 'react'
import Label from './Label'
import InputField from '@/components/InputField'

export default {
	title: 'fields|Label',

	parameters: {
		component: Label
	}
}

export const basic = () => (
	<Label htmlFor="firstName" text="First Name">
		<InputField id="firstName" name="firstName" type="text" />
	</Label>
)
