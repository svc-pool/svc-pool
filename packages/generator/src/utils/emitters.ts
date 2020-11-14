import * as tsm from 'ts-morph'
import { pipe } from 'ramda'
import { createLogger } from './logger'

const projLog = createLogger(emitRegistries)

export interface EmitRegistriesOptions {
	compilerOptions: tsm.CompilerOptionsContainer
	registryFiles: tsm.SourceFile[]
	outDir: string
	emitTsConfig?: boolean
}

export function emitRegistries({
	compilerOptions: compilerOptionsContainer,
	registryFiles,
	outDir,
}: EmitRegistriesOptions) {
	function createProjWithRegFiles() {
		const log = projLog.child(createProjWithRegFiles)

		log.verbose('begin')

		const compilerOptions = compilerOptionsContainer.get()
		log.verbose('compilerOptions:')
		log.verbose(compilerOptions)

		const slimProj = new tsm.Project({
			compilerOptions: {
				...compilerOptions,
				outDir,
				declaration: true,
				emitDeclarationOnly: true,
			},
			addFilesFromTsConfig: false,
		})

		function importFile(file: tsm.SourceFile) {
			const path = file.getFilePath()

			slimProj.addSourceFileAtPath(path)

			log.verbose(`imported file: ${path}`)
		}

		registryFiles.forEach(importFile)

		log.verbose('finished')

		return slimProj
	}

	function resolveDepFiles(proj: tsm.Project) {
		const log = projLog.child(resolveDepFiles)

		log.verbose('begin')

		log.verbose(`resolving deps`)
		const addedFiles = proj.resolveSourceFileDependencies()

		addedFiles.forEach((file) => {
			log.verbose(`imported dep: ${file.getFilePath()}`)
		})

		log.verbose('finished')

		return proj
	}

	function emitProj(proj: tsm.Project) {
		const log = projLog.child(emitProj)
		log.verbose(`emitting ${proj.getSourceFiles().length} files`)

		return proj.emit().then((emitResult) => {
			emitResult
				.getDiagnostics()
				.forEach((diagnostic) => log.verbose(diagnostic.getMessageText()))
			log.verbose('emitted')
			return proj
		})
	}

	return pipe(createProjWithRegFiles, resolveDepFiles, emitProj)()
}
