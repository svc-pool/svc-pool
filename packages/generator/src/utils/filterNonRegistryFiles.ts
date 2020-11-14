import * as tsm from 'ts-morph'
import * as R from 'ramda'
import { createLogger } from './logger'
import * as Guards from './guards'

const logger = createLogger(filterNonRegistryFiles.name)

export default function filterNonRegistryFiles(srcFiles: tsm.SourceFile[]) {
	const log = logger.child(filterNonRegistryFiles)

	const registryFiles = new Set<tsm.SourceFile>()

	const svcDefFiles = new Set<Guards.SvcDefFile>()

	for (const srcFile of srcFiles) {
		log.verbose(`checking ${srcFile.getFilePath()}`)

		if (Guards.isSvcDefFile(srcFile)) {
			log.verbose(`added ${srcFile.getFilePath()}`)
			svcDefFiles.add(srcFile)
		}
	}

	for (const svcDefFile of svcDefFiles) {
		registryFiles.add(findRegistryFile(svcDefFile))
	}

	let r = Array.from(registryFiles)
	log.verbose(`total: ${r.length}`)

	return r
}

function findRegistryFile(svcDefFile: Guards.SvcDefFile): tsm.SourceFile {
	const exportCreateSvcDef = svcDefFile
		.getDefaultExportSymbolOrThrow()
		?.getValueDeclarationOrThrow()

	if (!tsm.Node.isExportAssignment(exportCreateSvcDef)) {
		throw 'not isExportAssignment'
	}

	const callCreateSvcDevExp = exportCreateSvcDef.getExpression()

	if (!tsm.Node.isCallExpression(callCreateSvcDevExp)) {
		throw 'not isCallExpression'
	}

	const registryNode = callCreateSvcDevExp
		.getTypeArguments()[0]
		?.getDescendants()[0]

	if (!registryNode || !tsm.Node.isIdentifier(registryNode)) {
		throw 'not a SvcDefFile'
	}

	return registryNode.getDefinitions()[0].getSourceFile()
}
