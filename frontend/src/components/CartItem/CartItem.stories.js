import React from 'react'
import CartItem from './CartItem'

export default {
	title: 'ui|CartItem',

	parameters: {
		component: CartItem
	}
}

export const basic = () => (
	<CartItem
		image={{
			src: '/images/product_00001.png',
			alt: 'Product image',
			width: 182,
			height: 323
		}}
		title="SPF50+ 200ml Everyday Lotion"
		quantity={3}
		price="$20.00"
	/>
)
