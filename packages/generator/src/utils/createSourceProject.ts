import { Project } from 'ts-morph'
import { pipe, andThen } from 'ramda'
import { createTsConfigPath } from './createTsConfigPath'

export function createSourceProject(
	tsConfigFilePathOrProject: string | Project,
) {
	function createProj(tsConfigFilePath) {
		return new Project({
			tsConfigFilePath,
		})
	}

	if (typeof tsConfigFilePathOrProject === 'string') {
		return pipe(
			() => createTsConfigPath(tsConfigFilePathOrProject),
			andThen(createProj),
		)()
	}

	return tsConfigFilePathOrProject
}
