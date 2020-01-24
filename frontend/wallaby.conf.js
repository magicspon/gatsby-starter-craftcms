/* eslint-disable import/no-dynamic-require */
process.env.BABEL_ENV = 'test'

module.exports = function(wallaby) {
	// process.env.WALLABY = true

	return {
		files: [
			'jest.config.js',
			'__tests__/**/*.js',
			'src/**/*.js?(x)',
			'!src/**/*.test.js?(x)'
		],

		filesWithNoCoverageCalculated: [
			'**/*.stories.js',
			'src/style/**/*.js',
			'__tests__/__mocks__/*.js',
			'__tests__/utils/*.js'
		],

		tests: ['src/**/*.test.js?(x)'],

		env: {
			type: 'node',
			params: {
				env: 'wallaby=test'
			}
		},

		compilers: {
			'src/**/*.js?(x)': wallaby.compilers.babel()
		},

		testFramework: 'jest',

		debug: true,

		// eslint-disable-next-line no-shadow
		setup() {
			const path = require('path')
			const config = require(path.join(process.env.PWD, './jest.config'))

			// console.log(JSON.stringify(config))

			config.rootDir = './'
			config.setupFilesAfterEnv = [
				path.join(process.env.PWD, './__tests__/utils/jest.setup.js')
			]
			config.transform = {
				'^.+\\.jsx?$': path.join(
					process.env.PWD,
					'./__tests__/utils/jest.preprocess.js'
				)
			}
			// config.setupFilesAfterEnv = './__tests__/utils/test-setup.ts'
			wallaby.testFramework.configure(config)
		}
	}
}
