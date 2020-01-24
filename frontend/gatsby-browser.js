/* eslint-disable react/prop-types */
import 'cross-fetch/polyfill'
import objectFitImages from 'object-fit-images'
import React from 'react'
import raf from 'raf-throttle'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { init } from '@rematch/core'
import createRematchPersist, { getPersistor } from '@rematch/persist'
import storage from 'redux-persist/lib/storage/session'
import { PersistGate } from 'redux-persist/lib/integration/react'
import Layout from '@/container/Layout'
import { NavProvider } from '@/container/NavProvider'
import { ThemeProvider } from '@/container/ThemeProvider'
import { CartProvider } from '@/container/CartProvider'
import * as models from '@/store'

const persistPlugin = createRematchPersist({
	throttle: 500,
	version: 2,
	storage,
	key: 'GoodGive'
})
let seppuku = false
export const onClientEntry = async () => {
	const vh = window.innerHeight * 0.01
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`)

	window.addEventListener(
		'resize',
		raf(() => {
			document.documentElement.style.setProperty(
				'--vh',
				`${window.innerHeight * 0.01}px`
			)
		})
	)

	objectFitImages()

	if (typeof IntersectionObserver === `undefined`) {
		await import(`intersection-observer`)
	}

	const testNode = document.createElement('div')

	if (
		['', '-webkit-', '-moz-', '-ms-'].some(prefix => {
			try {
				testNode.style.position = `${prefix}sticky`
			} catch (e) {
				//
			}

			return testNode.style.position !== ''
		})
	) {
		seppuku = true
	}

	if (!seppuku) {
		document.documentElement.classList.add('no-sticky')
	}
}

export const wrapRootElement = ({ element }) => {
	const store = init({
		models,
		plugins: [persistPlugin]
	})
	const persistor = getPersistor()

	return (
		<HelmetProvider context={{}}>
			<Provider store={store}>
				<PersistGate loading="loading" persistor={persistor}>
					<CartProvider>
						<NavProvider>
							<ThemeProvider>{element}</ThemeProvider>
						</NavProvider>
					</CartProvider>
				</PersistGate>
			</Provider>
		</HelmetProvider>
	)
}

export const wrapPageElement = ({ element, props }) => {
	// props provide same data to Layout as Page element will get
	// including location, data, etc - you don't need to pass it
	return <Layout {...props}>{element}</Layout>
}
