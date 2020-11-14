export function isAMD() {
	const global = globalThis as any
	const _require = global.requirejs || global.require

	return (
		typeof _require === 'function' &&
		typeof global.define === 'function' &&
		!!global.define.amd
	)
}

export function isES() {
	return 'noModule' in (globalThis as any).HTMLScriptElement.prototype
}
