import { getLastCommit as _getLastCommit, Commit } from 'git-last-commit'
import execa from 'execa'

const getLastCommit = (dst: string): Promise<Commit> =>
	new Promise((rs, rj) =>
		_getLastCommit(
			(err, commit) => {
				if (err) {
					return rj(err)
				}
				rs(commit)
			},
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			{ dst },
		),
	)

async function getShortHash() {
	const { shortHash } = await getLastCommit(__dirname)
	return shortHash
}

async function setVer(hash: string) {
	const pr = execa(
		`yarn workspaces foreach --exclude root version -i 0.0.0-${hash}`,
		{ shell: true },
	)
	pr.stdout?.pipe(process.stdout)
	await pr
}

async function delivery() {
	const pr = execa(`yarn workspaces foreach --exclude root npm publish`, {
		shell: true,
	})
	pr.stdout?.pipe(process.stdout)

	await pr
}

async function main() {
	try {
		const shortHash = await getShortHash()
		await setVer(shortHash)
		await delivery()
	} catch (error) {
		console.error(error)
		process.exit(-1)
	}
}

main()
