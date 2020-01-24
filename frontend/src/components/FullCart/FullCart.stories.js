import React from 'react'
import FullCart from './FullCart'

export default {
	title: 'ui|FullCart',

	parameters: {
		component: FullCart
	}
}

export const basic = () => <FullCart setCartOpen={() => {}} isCartOpen />
