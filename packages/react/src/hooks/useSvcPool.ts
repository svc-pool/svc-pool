import * as React from 'react'
import { SvcPool } from '@svc-pool/core'
import { SvcPoolContext } from '../components/Context'

type UseSvcPoolHook<R = any> = {
	(): SvcPool<R>
}

export function createUseSvcPool<R = any>(
	context: React.Context<SvcPool<R> | null> | React.Context<SvcPool<R>>,
): UseSvcPoolHook<R> {
	return function useSvcPool() {
		// @ts-ignore
		return React.useContext(context) as SvcPool<R>
	}
}

export const useSvcPool = createUseSvcPool(SvcPoolContext)
