import ts from '@wessberg/rollup-plugin-ts'

import meta from '../package.json'

export default {
	input: './src/index.ts',
	output: [
		{
			dir: './dist/umd',
			format: 'umd',
			name: meta.name,
		},
		{
			dir: './dist/esm',
			format: 'esm',
		},
	],
	plugins: [ts({ tsconfig: './etc/tsconfig.prod.json' })],
}
