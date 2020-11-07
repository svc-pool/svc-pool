import { createSvcDef, ServiceFactory } from '@svc-pool/core'
import DefaultRegistry from './DefaultRegistry'
import { NamedRegistry } from './NamedRegistry'

export default createSvcDef<DefaultRegistry>('defaultPoint', () => 'svc')
