import * as React from 'react'
import { SvcPool, Point, SvcTable, ValueTypeOfSvc } from '@svc-pool/core'
import { useSvcPool as useDefaultSvcPool, createUseSvcPool } from './useSvcPool'
import { SvcPoolContext } from '../components/Context'

type UseServicesHook<R = any> = {
	(name: Point<R>): ValueTypeOfSvc<R, typeof name>[]
}

type UserFirstServiceHook<R> = {
	(name: Point<R>): ValueTypeOfSvc<R, typeof name> | undefined
}

export function createHooks<R = any>(
	context: React.Context<SvcPool<R> | null> | React.Context<SvcPool<R>>,
): [UseServicesHook<R>, UserFirstServiceHook<R>] {
	const useSvcPool =
		context === SvcPoolContext ? useDefaultSvcPool : createUseSvcPool(context)

	function useServices(name: Point<R>): ValueTypeOfSvc<R, typeof name>[] {
		const pool = useSvcPool()

		return pool.getServices(name)
	}

	function useFirstService(name: Point<R>): ValueTypeOfSvc<R, typeof name> {
		const pool = useSvcPool()

		return pool.getServices(name)?.[0]
	}

	return [useServices, useFirstService]
}

const [_useServices, _useFirstService] = createHooks(SvcPoolContext)

export const useServices = _useServices

export const useFirstService = _useFirstService
