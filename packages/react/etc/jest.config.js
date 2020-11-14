module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	collectCoverage: true,
	rootDir: '../',
	collectCoverageFrom: ['src/**/*'],
	// globals: {
	// 	'ts-jest': {
	// 		tsconfig: './tsconfig.json',
	// 	},
	// },

	setupFilesAfterEnv: ['./etc/setupTests.ts'],
}
