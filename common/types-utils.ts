import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import execa from 'execa'

export const resolve: typeof path.resolve = (...paths) => path.resolve(__dirname, '../', ...paths)
export const join: typeof path.join = (...paths) => path.join(__dirname, '../', ...paths)

export interface LogType {
  processing: {
    start(text: string, color?: ora.Color): ora.Ora
    stop(ora: ora.Ora): void
  }
  done(text: string): void
  error(text: string): void
}

export const log: LogType = {
  processing: {
    start(text, color = 'white') {
      return ora({ text, color }).start()
    },
    stop(ora) {
      ora.stop()
    }
  },
  done(text) {
    console.log(chalk.green(text))
  },
  error(text) {
    console.log(chalk.red(text))
  }
}

export async function execCommand(
  command: string,
  args: readonly string[],
  stdio: "inherit" | "pipe" = 'inherit',
  cwd: string = process.cwd()
): Promise<Partial<Pick<execa.ExecaReturnBase<string>, 'exitCode' | 'stdout' | 'stderr'>>> {
  return new Promise(async (resolve, reject) => {
    if (stdio === 'inherit') {
      const child = execa(command, args, { cwd, stdio })

      child.on('close', code => {
        if (code !== 0) {
          reject(`command failed: ${command} ${args.join(' ')}`)
        }
        resolve({ exitCode: code })
      })
    } else if (stdio === 'pipe') {
      const { exitCode, stdout, stderr } = await execa(command, args, { cwd, stdio })

      if (exitCode !== 0) {
        reject(`command failed: ${command} ${args.join(' ')}`)
      }
      resolve({ exitCode, stdout, stderr })
    }
  })
}
