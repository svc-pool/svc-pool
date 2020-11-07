import { ts } from 'ts-morph'
import { pipe, andThen } from 'ramda'
import { resolve } from 'path'
import isDir from './isDir'

function handleDir(dir: string) {
	const configPath = ts.findConfigFile(dir, ts.sys.fileExists)

	return configPath
}

export function createTsConfigPath(tsConfigFilePathOrProject: string) {
	const absPth = resolve(tsConfigFilePathOrProject)

	return pipe(
		() => absPth,
		isDir,
		andThen(isDir => {
			if (isDir) {
				return handleDir(absPth)
			}
			return absPth
		}),
	)()
}
