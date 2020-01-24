/* eslint-disable no-underscore-dangle */

import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { jsxDecorator } from 'storybook-addon-jsx'
import { withKnobs } from '@storybook/addon-knobs'
import { Provider } from 'react-redux'
import { init } from '@rematch/core'
import createRematchPersist, { getPersistor } from '@rematch/persist'
import storage from 'redux-persist/lib/storage/session'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { HelmetProvider } from 'react-helmet-async'
import PaymentProvider from '../src/container/PaymentProvider'
import { NavProvider } from '../src/container/NavProvider'
import { ThemeProvider } from '../src/container/ThemeProvider'
import { CartProvider } from '../src/container/CartProvider'
import * as models from '../src/store'
import '../src/style/main.css'
import theme from './theme'

const persistPlugin = createRematchPersist({
	throttle: 500,
	version: 2,
	blacklist: ['reset', 'activation'],
	storage,
	key: 'pes'
})

global.__BASE_PATH__ = ``
global.__PATH_PREFIX__ = ``
global.___loader = {
	enqueue: () => {},
	hovering: () => {}
}

global.RELEASE_DEMO = true
global.RELEASE_MVP = false
global.RELEASE_LAVA = false
global.RELEASE_ROCK = false

addParameters({
	options: {
		theme
	}
})
addDecorator(jsxDecorator)
addDecorator(withA11y)
addDecorator(withKnobs)
addDecorator(story => {
	const store = init({
		models,
		plugins: [persistPlugin]
	})
	const persistor = getPersistor()

	return (
		<HelmetProvider>
			<Provider store={store}>
				<PaymentProvider>
					<CartProvider>
						<NavProvider>
							<PersistGate loading="loading" persistor={persistor}>
								<ThemeProvider>{story()}</ThemeProvider>
							</PersistGate>
						</NavProvider>
					</CartProvider>
				</PaymentProvider>
			</Provider>
		</HelmetProvider>
	)
})

// automatically import all files ending in *.stories.js
configure(
	[
		require.context('../src', true, /\.stories\.js$/),
		require.context('../src', true, /\.stories\.mdx$/)
	],
	module
)
