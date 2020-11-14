import { FullSvcDef, Registry, Point } from '@svc-pool/core'
import { isAMD, isES } from './env-utils'

export type Loader<R extends Registry> = {
	loadSvcDefs(pluginPath: string | string[]): Promise<FullSvcDef<R, Point<R>>[]>
}

export type DynamicImport = {
	(path: string): Promise<any>
}

function _createAMDImport() {
	const _globalThis = globalThis as any
	const _require = _globalThis.requirejs || _globalThis.require

	const _import = (path: string) =>
		new Promise((resolve, reject) => _require([path], resolve, reject))

	return _import
}

export function createAMDImport(): DynamicImport {
	if (!isAMD()) throw 'Not in AMD environment'

	return _createAMDImport()
}

function _createESImport() {
	const _import = (path: string) => import(path).then((m) => m.default)

	return _import
}

export function createESImport(): DynamicImport {
	if (!isES()) throw 'Not in ES environment'

	return _createESImport()
}

function createDynamicImport() {
	if (isES()) {
		return _createESImport()
	}
	if (isAMD()) {
		return _createAMDImport()
	}
	throw 'Not in ES or AMD environment'
}

export function createLoader<R extends Registry>(
	dynamicImport?: DynamicImport,
): Loader<R> {
	const _dynamicImport = dynamicImport || createDynamicImport()

	const loadPath = async (pluginPath: string) => {
		let defOrDefs: any = await _dynamicImport(pluginPath)

		if (!Array.isArray(defOrDefs)) {
			defOrDefs = [defOrDefs]
		}

		return defOrDefs as FullSvcDef<R, Point<R>>[]
	}

	const loadPaths = (pluginPaths: string[]) =>
		Promise.all(pluginPaths.map(loadPath)).then((defss) => defss.flat())

	async function loadSvcDefs(pathOrPaths: string | string[]) {
		let paths: string[]
		if (Array.isArray(pathOrPaths)) {
			paths = [...pathOrPaths]
		} else {
			paths = [pathOrPaths]
		}

		return await loadPaths(paths)
	}

	return {
		loadSvcDefs,
	}
}
