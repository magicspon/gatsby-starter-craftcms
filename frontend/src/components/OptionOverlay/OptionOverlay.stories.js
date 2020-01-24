/* eslint-disable compat/compat */
import React from 'react'
import faker from 'faker'
import OptionOverlay from './OptionOverlay'

export default {
	title: 'ui|OptionOverlay',

	parameters: {
		component: OptionOverlay
	}
}

/*
[
	{
		"id": 1,
		"name": "Auckland Grammar",
		"classrooms": [
			{
				"id": 1,
				"name": "219a"
			}
		]
	},
	{
		"id": 2,
		"name": "Birkdale Primary",
		"classroom": []
	}
]
*/

export const basic = () => (
	<OptionOverlay
		placeholder="Auckland Grammar"
		schools={Array.from({ length: 8 }, (_, i) => ({
			id: i,
			name: faker.company.companyName()
		}))}
	/>
)
