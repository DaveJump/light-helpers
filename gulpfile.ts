import fse from 'fs-extra'
import gulp, { series } from 'gulp'
import Undertaker from 'undertaker'
import rollupConfig from './rollup.config'
import { join, log } from './common/types-utils'
import { rollup } from 'rollup'
import typedoc from 'gulp-typedoc'
import pkgConfig from './package.json'

type TaskFunc = Undertaker.Task

const paths = {
  root: join('/'),
  lib: join('/lib')
}

// Remove output dir first
const clearLibDir: TaskFunc = async (cb) => {
  fse.removeSync(paths.lib)
  cb()
  log.done('Cleared directory /lib')
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
    log.done('Build successfully')
  }
}

// Generate docs
const genDocs: TaskFunc = async (cb) => {
  gulp.src('src/**/*.ts').pipe(typedoc({
    module: 'commonjs',
    target: 'es5',
    out: 'docs/',
    name: pkgConfig.name
  }))
  cb()
  log.done('Docs generated')
}

export const build = series(clearLibDir, buildByRollup, genDocs)
