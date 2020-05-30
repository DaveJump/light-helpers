import { RollupOptions } from 'rollup'
import pluginTS from 'rollup-plugin-typescript2'
import pluginBabel from 'rollup-plugin-babel'
import pluginResolve from 'rollup-plugin-node-resolve'
import pluginCommonJs from 'rollup-plugin-commonjs'
import { eslint as pluginEslint } from 'rollup-plugin-eslint'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import { join } from './common/types-utils'
import pkgConfig from './package.json'

const paths = {
  input: '/src/index.ts',
  output: '/lib'
}

const rollupOptions: RollupOptions = {
  input: join(paths.input),
  output: [
    {
      file: join(paths.output, '/index.js'),
      format: 'cjs',
      name: pkgConfig.name
    },
    {
      file: join(paths.output, '/index.esm.js'),
      format: 'esm',
      name: pkgConfig.name
    }
  ],
  plugins: [
    pluginEslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**/*.ts'],
      exclude: ['node_modules/**', 'lib/**', '*.js']
    }),
    pluginCommonJs(), // support commonjs packages
    pluginResolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    pluginTS({
      useTsconfigDeclarationDir: true
    }),
    pluginBabel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      extensions: [
        ...DEFAULT_EXTENSIONS,
        '.ts' // support .ts extension
      ]
    })
  ]
}

export default rollupOptions
