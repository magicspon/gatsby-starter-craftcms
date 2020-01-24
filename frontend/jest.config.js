module.exports = {
	automock: false,
	displayName: 'pes',
	testEnvironment: 'jsdom',
	testURL: 'http://localhost',
	setupFilesAfterEnv: ['<rootDir>/__tests__/utils/jest.setup.js'],
	moduleNameMapper: {
		// module must come first
		'\\.css$': '<rootDir>/__tests__/__mocks__/style.js',
		'\\.module\\.css$': 'identity-obj-proxy',
		'\\.mdx$': '<rootDir>/__tests__/__mocks__/file.js',
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__tests__/__mocks__/file.js'
		// can also map files that are loaded by webpack with the file-loader
	},
	transformIgnorePatterns: ['node_modules/(?!(gatsby)/)', '/regression/'],
	// testMatch: ['<rootDir>/**/?(*.)(spec|test).js?(x)'],
	testMatch: [
		// '<rootDir>/**/__tests__/**/*.[jt]s?(x)',
		'<rootDir>/**/*(*.)@(spec|test).[tj]s?(x)'
	],
	globals: {
		__PATH_PREFIX__: ''
	},
	testPathIgnorePatterns: ['/node_modules/', '/cypress/', '/.cache/'],
	transform: {
		'^.+\\.jsx?$': '<rootDir>/__tests__/utils/jest.preprocess.js'
	},

	moduleDirectories: ['node_modules', 'src'],

	moduleFileExtensions: ['js', 'jsx', 'json'],

	collectCoverageFrom: [
		'src/**/*.js',
		'!src/**/*.story.js',
		'!src/**/*.stories.js',
		'!src/components/**/index.js',
		'!src/style/**/*.js'
	],
	coverageThreshold: {
		global: {
			statements: 17,
			branches: 8,
			functions: 20,
			lines: 17
		}
	},
	coverageReporters: ['json-summary', 'text', 'lcov']
}
