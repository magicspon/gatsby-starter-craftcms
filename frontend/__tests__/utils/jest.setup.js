// https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-core
import registerRequireContextHook from 'babel-plugin-require-context-hook/register'
// import '@babel/polyfill'
import '@testing-library/jest-dom/extend-expect'
registerRequireContextHook()

require('jest-fetch-mock').enableMocks()

// eslint-disable-next-line no-underscore-dangle
global.___loader = {
	enqueue: jest.fn()
}

// eslint-disable-next-line no-underscore-dangle
global.___navigate = jest.fn()
// this is the jest setupTestFrameworkScriptFile

// here we set up a fake localStorage because jsdom doesn't support it
// https://github.com/tmpvar/jsdom/issues/1137
if (!window.localStorage) {
	window.localStorage = {}

	// eslint-disable-next-line compat/compat
	Object.assign(window.localStorage, {
		removeItem: function removeItem(key) {
			delete this[key]
		}.bind(window.localStorage),
		setItem: function setItem(key, val) {
			this[key] = String(val)
		}.bind(window.localStorage),
		getItem: function getItem(key) {
			return this[key]
		}.bind(window.localStorage)
	})
}

window.matchMedia = jest.fn().mockImplementation(query => {
	return {
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn()
	}
})
