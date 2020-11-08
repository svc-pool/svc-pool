import * as React from 'react'
import { SvcPool } from '@svc-pool/core'
import { SvcPoolContext as DefaultSvcPoolContext } from './Context'

type Props<R = any> = React.PropsWithChildren<{
	pool: SvcPool<R>
	context?: React.Context<SvcPool<R> | null>
}>

export function Provider<R = any>({
	context: Context = DefaultSvcPoolContext,
	pool,
	children,
}: Props<R>) {
	return <Context.Provider value={pool}>{children}</Context.Provider>
}
