import { SourceFile, Node } from 'ts-morph'
import { filter } from 'ramda'
import { createLogger } from './logger'

const logger = createLogger(filterNonSvcDev.name)
export default function filterNonSvcDev(srcFiles: SourceFile[]) {
	const log = logger.child(filterNonSvcDev)
}
