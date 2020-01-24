/* eslint-disable react/prop-types */
const React = require('react')
const { init } = require('@rematch/core')
const { Provider } = require('react-redux')
const { HelmetProvider } = require('react-helmet-async')
const Layout = require('@/container/Layout').default
const { NavProvider } = require('@/container/NavProvider')
const { ThemeProvider } = require('@/container/ThemeProvider')
const { CartProvider } = require('@/container/CartProvider')
const models = require('@/store')

const context = {}

exports.wrapRootElement = ({ element }) => {
	const store = init({
		models
	})
	return (
		<HelmetProvider context={context}>
			<Provider store={store}>
				<CartProvider>
					<NavProvider>
						<ThemeProvider>{element}</ThemeProvider>
					</NavProvider>
				</CartProvider>
			</Provider>
		</HelmetProvider>
	)
}

exports.wrapPageElement = ({ element, props }) => {
	return <Layout {...props}>{element}</Layout>
}
