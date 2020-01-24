import React from 'react'
import Checkbox from './Checkbox'

export default {
	title: 'fields|Checkbox',

	parameters: {
		component: Checkbox
	}
}

export const basic = () => (
	<Checkbox name="test" id="name">
		I agree to receive future communication about GoodGive Fundraising
	</Checkbox>
)
