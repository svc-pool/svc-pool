import * as React from 'react'
import { SvcPool, Point, SvcTable } from '@svc-pool/core'
import { useSvcPool as useDefaultSvcPool, createUseSvcPool } from './useSvcPool'
import { SvcPoolContext } from '../components/Context'

type UseServicesHook<R = any> = {
	(name: Point<R>): SvcTable<R>[typeof name]
}

export function createUseServices<R = any>(
	context: React.Context<SvcPool<R> | null> | React.Context<SvcPool<R>>,
): UseServicesHook<R> {
	const useSvcPool =
		context === SvcPoolContext ? useDefaultSvcPool : createUseSvcPool(context)

	return function useServices(name: Point<R>): SvcTable<R>[typeof name] {
		const pool = useSvcPool()

		return pool.getServices(name)
	}
}

export const useServices = createUseServices(SvcPoolContext)
