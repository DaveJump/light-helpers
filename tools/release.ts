import { execCommand } from '../common/types-utils'
import inquirer from 'inquirer'
import getBranch from 'git-branch'
import chalk from 'chalk'
import { log } from '../common/types-utils'
import pkg from '../package.json'

// Check branch on 'master'
const checkBranchIsOnMaster: () => Promise<boolean> | void = async () => {
  const branch = await getBranch(process.cwd())
  if (branch !== 'master') {
    console.log(
      chalk.redBright(
        `\nERROR: You are now on branch ${chalk.yellow(
          branch
        )}, you must commit or stash your changes and checkout to branch "master" before releasing a version.`
      )
    )
    process.exit(1)
  }
  return true
}

// Input version to release
const defaultVersion = pkg.version.replace(/(\d+\.\d+)(\.\d+)/, (m, g1, g2) => g1 + (+g2 + 1))
const receiveVersion: () => Promise<string> = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'version',
      type: 'input',
      message: `Enter release version (default to 'patch')`
    }
  ])
  return answers.version.trim() || defaultVersion
}

const defaultCommitMsg = 'chore(all): release changes'

// Check uncommit changes
const checkUncommits: () => Promise<string> = async () => {
  let { stdout: uncommits } = await execCommand('git', ['status', '--porcelain'])
  if (uncommits) {
    console.log(
      chalk.yellow(`\nYou have uncommit changes, commit them to continue or exit and commit manually.`)
    )
    const answers = await inquirer.prompt([
      {
        name: 'commitMsg',
        type: 'input',
        message: `Enter commit message (default to ${defaultCommitMsg})`
      }
    ])
    return answers.commitMsg || defaultCommitMsg
  }
  return ''
}

// Sync remote origin if there are uncommit changes
const pushToRemote: (commitMsg?: string) => Promise<void> = async (commitMsg = defaultCommitMsg) => {
  const spinner = log.processing.start('Pushing to remote origin...')
  await execCommand('git', ['add', '.'])
  await execCommand('git', ['commit', '-m', `"${commitMsg}"`])
  await execCommand('git', ['push', 'origin', '-u', 'master'])
  spinner.stop()
}

// runVersion
const runVersion: (version: string) => Promise<any> = async (version) => {
  const spinner = log.processing.start(`Releasing version ${version}`)
  await execCommand('npm', ['version', `${version}`, '--message', `"[release] ${version}"`])
  await execCommand('npm', ['publish', '--access', 'public'])
  spinner.stop()
}

const runRelease: () => Promise<any> = async () => {
  try {
    await checkBranchIsOnMaster()
    const version = await receiveVersion()
    const commitMsg = await checkUncommits()
    if (commitMsg) {
      await pushToRemote(commitMsg)
    }
    await runVersion(version)
    console.log(
      chalk.green(`\nReleased version ${version || defaultVersion} successfully.`)
    )
  } catch (e) {
    process.exit(1)
  }
}

runRelease()
