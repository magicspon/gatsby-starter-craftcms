/* eslint-disable no-underscore-dangle */

import { configure, addDecorator, addParameters } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { jsxDecorator } from 'storybook-addon-jsx'
import { withKnobs } from '@storybook/addon-knobs'
import createRematchPersist, { getPersistor } from '@rematch/persist'
import storage from 'redux-persist/lib/storage/session'
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

addParameters({
	options: {
		theme
	}
})
addDecorator(jsxDecorator)
addDecorator(withA11y)
addDecorator(withKnobs)
addDecorator(story => {
	return story()
})

// automatically import all files ending in *.stories.js
configure(
	[
		require.context('../src', true, /\.stories\.js$/),
		require.context('../src', true, /\.stories\.mdx$/)
	],
	module
)
