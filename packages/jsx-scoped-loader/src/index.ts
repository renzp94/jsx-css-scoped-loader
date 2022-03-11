import type { Module, Options } from '@swc/core'
import { transformSync } from '@swc/core'
import JsxScopedVisitor from './jsx-scoped-visitor'

const defaultOptions: Options = {
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: true,
      decorators: false,
      dynamicImport: false,
    },
    transform: {
      react: {
        pragma: 'React.createElement',
        pragmaFrag: 'React.Fragment',
        throwIfNamespace: true,
        development: false,
        useBuiltins: false,
      },
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
