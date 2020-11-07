import * as tsm from 'ts-morph'
import * as R from 'ramda'
import { createLogger } from './logger'

const logger = createLogger('Guards')

function isCreateSvcDefDef(defInfo: tsm.DefinitionInfo) {
	if (defInfo.getName() !== 'createSvcDef') {
		return false
	}

	return true
}

const isSvcDefCallLogger = logger.child(isCreateSvcDefCall.name)
export function isCreateSvcDefCall(node: tsm.Node) {
	if (!tsm.Node.isExportAssignment(node)) {
		isSvcDefCallLogger.verbose('not an exp assign')
		return false
	}

	const callExpression = node.getExpression()

	if (!tsm.Node.isCallExpression(callExpression)) {
		isSvcDefCallLogger.verbose('not a call')

		return false
	}

	const registryType = callExpression.getTypeArguments()[0]?.getDescendants()[0]

	if (!tsm.Node.isIdentifier(registryType)) {
		isSvcDefCallLogger.verbose('not an ident')
		return false
	}

	const createSvcDefExp = callExpression.getExpression()

	if (!tsm.Node.isIdentifier(createSvcDefExp)) {
		return false
	}

	const definitions = createSvcDefExp.getDefinitions()

	return R.any(isCreateSvcDefDef, definitions)
}

export type SvcDefFile = {} & tsm.SourceFile

export function isSvcDefFile(srcFile: tsm.SourceFile): srcFile is SvcDefFile {
	const exportValue = srcFile.getDefaultExportSymbol()?.getValueDeclaration()

	return !!exportValue && isCreateSvcDefCall(exportValue)
}
