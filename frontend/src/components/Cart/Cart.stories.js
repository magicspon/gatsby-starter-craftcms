import React from 'react'
import Cart from './Cart'

export default {
	title: 'ui|Cart',

	parameters: {
		component: Cart
	}
}

export const basic = () => (
	<Cart
		items={[
			{
				id: 1,
				image: {
					src: '/images/product_00001.png',
					alt: 'Product image',
					width: 182,
					height: 323
				},
				title: 'SPF50+ 200ml Everyday Lotion',
				quantity: 3,
				price: '$20.00'
			},
			{
				id: 2,
				image: {
					src: '/images/product_00001.png',
					alt: 'Product image',
					width: 182,
					height: 323
				},
				title: 'SPF50+ 200ml Everyday Lotion',
				quantity: 3,
				price: '$20.00'
			}
		]}
	/>
)
