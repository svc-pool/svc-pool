import * as React from 'react'
import { SvcPool } from '@svc-pool/core'

export type RegistryContext<R> = SvcPool<R>

// @ts-ignore
export const SvcPoolContext = React.createContext<SvcPool<any>>(null)
