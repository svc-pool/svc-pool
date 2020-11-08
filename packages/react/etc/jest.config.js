module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	collectCoverage: true,
	rootDir: '../',
	collectCoverageFrom: ['src/**/*'],
	globals: {
		'ts-jest': {
			packageJson: 'package.json',
		},
	},

	setupFilesAfterEnv: ['./etc/setupTests.ts'],
}
