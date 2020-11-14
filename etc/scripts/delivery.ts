import execa from 'execa'

async function setVer(version: string) {
	const pr = execa(
		`yarn workspaces foreach --exclude root version -i ${version}`,
		{ shell: true },
	)
	pr.stdout?.pipe(process.stdout)
	await pr
}

async function delivery(npmTag?: string) {
	let script = 'yarn workspaces foreach --exclude root npm publish'

	if (npmTag) {
		script += ` --tag ${npmTag}`
	}

	const pr = execa(script, {
		shell: true,
	})
	pr.stdout?.pipe(process.stdout)

	await pr
}

async function main() {
	try {
		await setVer(String(process.env.DELIVERY_VERSION))
		await delivery(process.env.NPM_TAG)
	} catch (error) {
		console.error(error)
		process.exit(-1)
	}
}

main()
