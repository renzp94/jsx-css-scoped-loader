import JsxScopedVisitor from '@renzp/swc-jsx-scoped'
import type { Module, Options } from '@swc/core'
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
