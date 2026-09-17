const { execFileSync } = require("node:child_process")

const releaseType = process.argv[2] || "patch"
const allowedReleaseTypes = new Set(["major", "minor", "patch"])

if (!allowedReleaseTypes.has(releaseType)) {
  console.error("Usage: npm run release:github -- <major|minor|patch>")
  process.exit(1)
}

const run = (command, args) => execFileSync(command, args, { stdio: "inherit" })
const output = (command, args) => execFileSync(command, args, { encoding: "utf8" }).trim()

if (output("git", ["status", "--porcelain"])) {
  console.error("Release requires a clean working tree.")
  process.exit(1)
}

run("npm", ["test"])
run("npm", ["run", "lint"])
run("npm", ["run", "pack:check"])
run("npm", ["version", releaseType])

const version = output("npm", ["pkg", "get", "version"]).replace(/^"|"$/g, "")
const tag = `v${version}`

run("git", ["push", "origin", "main", "--follow-tags"])
run("gh", ["release", "create", tag, "--verify-tag", "--generate-notes", "--title", tag])