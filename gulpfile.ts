/// <reference types="./typings/conventional-changelog" />

import fse from 'fs-extra'
import gulp, { series } from 'gulp'
import rollupConfig from './rollup.config'
import { join, log } from './common/types-utils'
import { rollup } from 'rollup'
import typedoc from 'gulp-typedoc'
import pkgConfig from './package.json'
import conventionalChangelog from 'conventional-changelog'

type TaskFunc = gulp.TaskFunction

// Remove output dir first
const clearLibDir: TaskFunc = async (cb) => {
  fse.removeSync(join('/lib'))
  cb()
  log.done('Directory \'/lib\' cleared')
}

// Building sources
const buildByRollup: TaskFunc = async (cb) => {
  const inputOptions = {
    input: rollupConfig.input,
    external: rollupConfig.external,
    plugins: rollupConfig.plugins
  }
  const outOptions = rollupConfig.output
  const bundle = await rollup(inputOptions)

  if (Array.isArray(outOptions)) {
    await Promise.all(outOptions.map(outOption => bundle.write(outOption)))
    cb()
    log.done('Sources built')
  }
}

// Generate docs
const genDocs: TaskFunc = async (cb) => {
  gulp.src(['src/**/*.ts', '!src/**/index.ts']).pipe(typedoc({
    module: 'commonjs',
    target: 'es5',
    out: 'docs/',
    name: pkgConfig.name
  }))
  cb()
  log.done('Docs generated')
}

// Generate changelog
const genChangeLog: TaskFunc = async (cb) => {
  const clPath: string = join('CHANGELOG.md')
  const clPipe = await conventionalChangelog({
    preset: 'angular',
    releaseCount: 0
  })
  clPipe.setEncoding('utf-8')

  const resultArray = ['# CHANGELOG\n\n']
  clPipe.on('data', chunk => {
    chunk = chunk.replace(/\/commits\//g, '/commit/')
    resultArray.push(chunk)
  })
  clPipe.on('end', async () => {
    await fse.createWriteStream(clPath).write(resultArray.join(''))
    cb()
    log.done('Changelog generated')
  })
}

export const build = series(clearLibDir, buildByRollup, genDocs, genChangeLog)
export const docs = genDocs
export const changelog = genChangeLog
