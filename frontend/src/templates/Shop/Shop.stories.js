import React from 'react'
import Layout from '@/container/Layout'
import Shop from './Shop'

export default {
	title: 'template|Shop',

	parameters: {
		component: Shop
	}
}

export const basic = () => (
	<Layout path="/">
		<Shop />
	</Layout>
)
