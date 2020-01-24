import React from 'react'
import ProductDetails from './ProductDetails'

export default {
	title: 'product|ProductDetails',

	parameters: {
		component: ProductDetails
	}
}

const description =
	'<ul><li>UVA/UVB Broad Spectrum</li><li>Dermatologically approved</li><li>Paraben free</li><li>Dry touch</li><li>Aloe Vera, Vitamin E & Mineral Silica </li><li>Four hours water resistance</li></ul>'

export const basic = () => (
	<ProductDetails
		rrp="$27.00"
		price="$25.00"
		title="SPF50+ Everyday Lotion"
		options={[
			{ id: 1, value: '250ml' },
			{ id: 2, value: '400ml' },
			{ id: 3, value: '750ml' }
		]}
		description={description}
	/>
)
