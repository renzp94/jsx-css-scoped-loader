import type { Module, Options } from '@swc/core'
import { transformSync } from '@swc/core'
import JsxScopedVisitor from './jsx-scoped-visitor'

const defaultOptions: Options = {
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: true,
      dynamicImport: true,
    },
  },
}

export default function jsxLoader(source) {
  const { code } = transformSync(source, {
    plugin: (m) => new JsxScopedVisitor(this.resourcePath).visitModule(m as Module),
    ...defaultOptions,
  })
  return code
}
