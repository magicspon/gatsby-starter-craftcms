import React from 'react'
import Layout from '@/container/Layout'
import ProductPage from './ProductPage'

export default {
	title: 'template|ProductPage',

	parameters: {
		component: ProductPage
	}
}

export const basic = () => (
	<Layout path="/">
		<ProductPage />
	</Layout>
)
