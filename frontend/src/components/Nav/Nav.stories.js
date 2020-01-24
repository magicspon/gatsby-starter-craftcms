import React from 'react'
import Nav from './Nav'

export default {
	title: 'global|Nav',

	parameters: {
		component: Nav,
		jest: ['Nav']
	}
}

export const basic = () => <Nav path="/" />
export const shop = () => <Nav path="/shop/" />
export const user = () => <Nav path="/user/" />
