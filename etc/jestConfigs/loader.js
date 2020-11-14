// eslint-disable-next-line @typescript-eslint/no-var-requires
const requirejs = require('requirejs')

requirejs.config({
	baseUrl: __dirname,
	nodeRequire: require,
})

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	collectCoverage: true,
	rootDir: '../../packages/loader/',
	collectCoverageFrom: ['src/**/*'],
	globals: {
		'ts-jest': {
			tsConfig: 'packages/loader/tsconfig.json',
		},
	},
}
