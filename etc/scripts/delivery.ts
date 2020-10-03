import execa from 'execa'

async function setVer(version: string) {
	const pr = execa(
		`yarn workspaces foreach --exclude root version -i ${version}`,
		{ shell: true },
	)
	pr.stdout?.pipe(process.stdout)
	await pr
}

async function delivery(npmTag = 'experimental') {
	const pr = execa(
		`yarn workspaces foreach --exclude root npm publish --tag ${npmTag}`,
		{
			shell: true,
		},
	)
	pr.stdout?.pipe(process.stdout)

	await pr
}

async function main() {
	try {
		await setVer(String(process.env.DELIVERY_VERSION))
		await delivery(String(process.env.NPM_TAG))
	} catch (error) {
		console.error(error)
		process.exit(-1)
	}
}

main()
