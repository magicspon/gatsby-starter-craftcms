/* eslint-disable react/prop-types */
import React from 'react'
import Layout from '@/container/Layout'

export const wrapPageElement = ({ element, props }) => {
	// props provide same data to Layout as Page element will get
	// including location, data, etc - you don't need to pass it
	return <Layout {...props}>{element}</Layout>
}
