import React from 'react'
import ProductItem from './ProductItem'

export default {
	title: 'product|ProductItem',

	parameters: {
		component: ProductItem
	}
}

export const basic = () => (
	<ProductItem
		image={{
			src: '/images/product_00007.png',
			alt: 'Product image',
			width: 218,
			height: 472
		}}
		title="Everyday SPF 50+"
		volume="400ml"
		price="$20"
	/>
)
