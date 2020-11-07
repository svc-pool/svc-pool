module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	rootDir: '../',
	collectCoverageFrom: ['src/**/*'],
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json',
		},
	},
}
