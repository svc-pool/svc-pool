// eslint-disable-next-line @typescript-eslint/no-var-requires
const requirejs = require('requirejs')

requirejs.config({
	baseUrl: process.cwd(),
	nodeRequire: require,
})

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	collectCoverage: true,
	rootDir: '../',
	collectCoverageFrom: ['src/**/*'],
	globals: {
		// simulate AMD env
		requirejs,
		'ts-jest': {
			packageJson: 'package.json',
		},
	},
}
