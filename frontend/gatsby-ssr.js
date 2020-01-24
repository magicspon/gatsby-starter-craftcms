/* eslint-disable react/prop-types */
const React = require('react')
const Layout = require('@/container/Layout').default

exports.wrapPageElement = ({ element, props }) => {
	return <Layout {...props}>{element}</Layout>
}
