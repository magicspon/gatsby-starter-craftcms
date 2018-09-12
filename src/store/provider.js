import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import store from './index'

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => (
	<Provider store={store}>
		<Fragment>{element}</Fragment>
	</Provider>
)
