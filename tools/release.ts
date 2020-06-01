import { exec } from 'shelljs'
import inquirer from 'inquirer'
import getBranch from 'git-branch'
import chalk from 'chalk'
import { log } from '../common/types-utils'
import pkg from '../package.json'

const execSilently: (command: string) => Promise<string> = async (command) => {
  return new Promise(resolve => {
    exec(command, { silent: true }, (code, stdout, stderr) => {
      if (stderr) {
        console.log(
          chalk.red(`\n\n${stderr}`)
        )
        process.exit(code || 1)
      } else {
        resolve(stdout)
      }
    })
  })
}

// Check branch on 'master'
const checkBranchIsOnMaster: () => Promise<boolean> | void = async () => {
  const branch = await getBranch(process.cwd())
  if (branch !== 'master') {
    console.log(
      chalk.red(
        `\n\nERROR: You are now on branch ${chalk.yellow(
          branch
        )}, you must commit or stash your changes and checkout to branch "master" before releasing a version.`
      )
    )
    process.exit(1)
  }
  return true
}

// Input version to release
const receiveVersion: () => Promise<string> = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'version',
      type: 'input',
      message: `Enter release version (default to 'minor')`
    }
  ])
  return answers.version.trim()
}

const defaultCommitMsg = 'chore(all): release changes'

// Check uncommit changes
const checkUncommits: () => Promise<string> = async () => {
  let uncommits = await execSilently('git status --porcelain')
  uncommits = uncommits.replace(/\n+/g, '').trim()
  if (uncommits) {
    console.log(
      chalk.yellow(`\n\nYou have uncommit changes, commit them to continue or exit and commit manually.`)
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
const pushToRemote: (commitMsg?: string) => void = async (commitMsg = defaultCommitMsg) => {
  const spinner = log.processing.start('Pushing to remote origin...')
  await execSilently('git add .')
  await execSilently(`git commit -m "${commitMsg}"`)
  await execSilently('git push origin -u master')
  spinner.stop()
}


// runVersion
const defaultVersion = pkg.version.replace(/(\d+\.)(\d+)(\.\d+)/, (m, g1, g2, g3) => g1 + (+g2 + 1) + g3)
const runVersion: (version?: string) => Promise<any> = async (version = defaultVersion) => {
  const spinner = log.processing.start(`Releasing version ${version}`)
  await execSilently(`npm version ${version} --message "[release] ${version}"`)
  // await execSilently('npm publish --access=public')
  spinner.stop()
}

const runRelease: () => Promise<any> = async () => {
  await checkBranchIsOnMaster()
  const version = await receiveVersion()
  const commitMsg = await checkUncommits()
  if (commitMsg) {
    await pushToRemote(commitMsg)
  }
  await runVersion(version)
  console.log(
    chalk.green(`\n\nReleased version ${version || defaultVersion} successfully.`)
  )
}

runRelease()