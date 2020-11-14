import * as React from 'react'
import { resolveDefs, createSvcDef, SvcPool } from '@svc-pool/core'
import { pipe, andThen } from 'ramda'
import { mount } from 'enzyme'
import { useSvcPool, useServices, Provider } from '../src'
import { HookWrapper } from './utils'

interface TestRegistry {
	'test-point': any
}

test('useSvcPool', async () => {
	const getValueProvidedByHook = (svcPool: SvcPool<TestRegistry>) => {
		let actual: SvcPool<TestRegistry> | undefined
		const runner = () => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			actual = useSvcPool()
		}

		mount(
			<Provider pool={svcPool}>
				<HookWrapper callback={runner} />
			</Provider>,
		)

		return { actual, svcPool }
	}

	const assert = pipe<
		SvcPool<TestRegistry>,
		ReturnType<typeof getValueProvidedByHook>,
		any
	>(getValueProvidedByHook, ({ actual, svcPool }) =>
		expect(actual).toBe(svcPool),
	)

	await pipe(
		resolveDefs,
		andThen(assert),
	)(createSvcDef<TestRegistry>('test-point', () => 'a'))
})

test('useServices', async () => {
	const pluginOfManyPoint = [
		createSvcDef<TestRegistry>('test-point', {
			factory: () => 'service1',
		}),
		createSvcDef<TestRegistry>('test-point', {
			factory: () => 'service2',
		}),
	]

	const getValueProvidedByHook = (svcPool: SvcPool<TestRegistry>) => {
		let actual: any[] | undefined
		const runner = () => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			actual = useServices('test-point')
		}

		mount(
			<Provider pool={svcPool}>
				<HookWrapper callback={runner} />
			</Provider>,
		)

		return { actual }
	}

	const assert = pipe(getValueProvidedByHook, ({ actual }) => {
		expect(actual).toStrictEqual(['service1', 'service2'])
	})

	const svcPool = await resolveDefs(...pluginOfManyPoint)

	assert(svcPool)
})
