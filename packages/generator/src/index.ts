import { pipe, andThen } from 'ramda'
import { emitRegistries, EmitRegistriesOptions } from './utils/emitters'
import { createSourceProject } from './utils/createSourceProject'
import filterNonRegistryFiles from './utils/filterNonRegistryFiles'

export const listRegistryFiles = (
	tsconfigPathOrProject: Parameters<typeof createSourceProject>[number],
) =>
	pipe(
		createSourceProject,
		andThen(srcProj => srcProj.getSourceFiles()),
		andThen(filterNonRegistryFiles),
	)(tsconfigPathOrProject)

type GenerateSrcOptions = Omit<
	EmitRegistriesOptions,
	'compilerOptions' | 'registryFiles'
> & {
	tsconfigPathOrProject: Parameters<typeof createSourceProject>[number]
}

export const generateSrc = (options: GenerateSrcOptions) => {
	const { tsconfigPathOrProject } = options

	return pipe(
		createSourceProject,
		andThen(srcProj => ({
			srcProj,
			registryFiles: srcProj.getSourceFiles(),
		})),
		andThen(({ registryFiles, ...other }) => ({
			...other,
			registryFiles: filterNonRegistryFiles(registryFiles),
		})),
		andThen(({ srcProj, registryFiles }) =>
			emitRegistries({
				compilerOptions: srcProj.compilerOptions,
				registryFiles,
				...options,
			}),
		),
	)(tsconfigPathOrProject)
}
