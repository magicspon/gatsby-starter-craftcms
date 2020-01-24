import React from 'react'
import Select from './Select'

export default {
	title: 'fields|Select',

	parameters: {
		component: Select
	}
}

export const basic = () => (
	<Select
		options={[
			{ id: 1, value: '250ml' },
			{ id: 2, value: '400ml' },
			{ id: 3, value: '750ml' }
		]}
	/>
)

export const small = () => (
	<Select
		className="max-w-xs"
		size="small"
		options={[
			{ id: 1, value: '250ml' },
			{ id: 2, value: '400ml' },
			{ id: 3, value: '750ml' }
		]}
	/>
)
