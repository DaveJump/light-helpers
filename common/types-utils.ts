import path from 'path'
import chalk from 'chalk'
import ora from 'ora'

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
