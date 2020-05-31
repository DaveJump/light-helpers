/// <reference types="node" />

declare module 'conventional-changelog' {
  import cvclCore from 'conventional-changelog-core'
  import * as Stream from 'stream'

  export interface Options extends cvclCore.Options {
    preset?: 'angular' | 'atom' | 'codemirror' | 'ember' | 'eslint' | 'express' | 'jquery' | 'jscs' | 'jshint'
  }

  export default function conventionalChangelog(
    options?: Options,
    context?: cvclCore.Context,
    gitRawCommitsOpts?: cvclCore.GitRawCommitsOptions,
    parserOpts?: cvclCore.ParserOptions,
    writerOpts?: cvclCore.WriterOptions
  ): Stream.Readable
}
