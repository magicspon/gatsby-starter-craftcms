import React from 'react'
import InputNumber from './InputNumber'

export default {
	title: 'fields|InputNumber',

	parameters: {
		component: InputNumber
	}
}

const noop = () => {}

export const basic = () => (
	<InputNumber
		setValue={noop}
		getValues={noop}
		name="quantity"
		// ref={register({ required: 'This field is required' })}
		// error={errors.quantity}
	/>
)
