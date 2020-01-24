import React from 'react'
import List from './List'

export default {
	title: 'widget|List',

	parameters: {
		component: List
	}
}

export const basic = () => (
	<List
		totalFunds="$20,214"
		totalOrders={805}
		bonuses="10x"
		remaining="5 days to go"
	/>
)
