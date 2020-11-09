import ts from '@wessberg/rollup-plugin-ts'

export default {
	input: {
		index: './src/index.ts',
		bin: './src/bin/index.ts',
	},
	output: {
		dir: './dist',
		format: 'cjs',
		entryFileNames: '[name].js',
	},

	plugins: [ts({ tsconfig: './etc/tsconfig.prod.json' })],
}
