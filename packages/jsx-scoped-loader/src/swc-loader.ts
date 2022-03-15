import type { Options, Module } from '@swc/core'
import JsxScopedVisitor from './swc-plugin-jsx-scoped'
import { transformSync } from '@swc/core'

const defaultOptions: Options = {
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: true,
      dynamicImport: true,
    },
  },
}

export default (source: string, resourcePath: string) => {
  return transformSync(source, {
    plugin: (m) => new JsxScopedVisitor(resourcePath).visitModule(m as Module),
    ...defaultOptions,
  })
}
