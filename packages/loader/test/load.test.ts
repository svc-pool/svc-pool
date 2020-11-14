import { createLoader } from '../src/create-loader'
import { resolveDefs } from '@svc-pool/core'

jest.mock('../src/env-utils', () => {
	return {
		isAMD: () => true,
		isES: () => false,
	}
})

interface TestRegistry {
	// eslint-disable-next-line jest/no-export
	'a-point-for-test': string[]
}

test('load', async () => {
	const loader = createLoader<TestRegistry>()

	const svcDefs = await loader.loadSvcDefs(['./test/assets/p1'])

	const svcPool = await resolveDefs<TestRegistry>(...svcDefs)

	expect(svcPool.getServices('a-point-for-test')).toStrictEqual([
		'a-service-for-test',
	])
})
