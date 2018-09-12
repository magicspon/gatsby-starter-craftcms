process.env.BABEL_ENV = 'test'

module.exports = function(wallaby) {
	return {
		files: [
			'setup-jest.js',
			{
				pattern: 'node_modules/babel-polyfill/dist/polyfill.js',
				instrument: false
			},
			{ pattern: 'src/js/**/*.js' }
		],

		tests: [{ pattern: '__tests__/**/*.test.js' }],

		env: {
			type: 'node',
			runner: 'node'
		},

		testFramework: 'jest',

		compilers: {
			'**/*.js': wallaby.compilers.babel()
		},

		debug: true,

		setup() {
			const jestConfig = require('./package.json').jest // eslint-disable-line global-require
			wallaby.testFramework.configure(jestConfig)
		}
	}
}
