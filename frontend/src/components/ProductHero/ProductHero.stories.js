import React from 'react'
import ProductHero from './ProductHero'

export default {
	title: 'product|ProductHero',

	parameters: {
		component: ProductHero
	}
}

export const basic = () => (
	<ProductHero
		className="min-h-screen"
		value="$2"
		text="of your purchase will be donated to Auckland Grammar"
		image={{
			src: '/images/product_00001.png',
			width: 182,
			height: 323,
			alt: 'product image'
		}}
	/>
)
