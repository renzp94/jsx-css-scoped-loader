import type {
  StringLiteral,
  JSXOpeningElement,
  JSXAttributeOrSpread,
  JSXAttribute,
  ModuleDeclaration,
} from '@swc/core'
import { Visitor } from '@swc/core/Visitor'
import path from 'path'
import fs from 'fs'
import hash from 'hash-sum'
import { getFileFullPath } from './utils'

export default class JsxScopedVisitor extends Visitor {
  resourcePath: string
  hash: string
  constructor(resourcePath: string) {
    super()
    this.resourcePath = resourcePath
  }
  visitModuleDeclaration(n: ModuleDeclaration): ModuleDeclaration {
    switch (n.type) {
      case 'ExportDeclaration':
        return this.visitExportDeclaration(n)
      case 'ExportDefaultDeclaration':
        return this.visitExportDefaultDeclaration(n)
      case 'ExportNamedDeclaration':
        return this.visitExportNamedDeclaration(n)
      case 'ExportDefaultExpression':
        return this.visitExportDefaultExpression(n)
      case 'ImportDeclaration':
        this.setHash(n.source)
        return this.visitImportDeclaration(n)
      case 'ExportAllDeclaration':
        return this.visitExportAllDeclaration(n)
    }
  }
  /**
   * 设置hash
   */
  setHash(n: StringLiteral) {
    const cssFilename = n.value?.split('/')?.pop()
    const regex = /\.scoped.(css|less|scss|sass)$/
    if (!regex.test(cssFilename)) {
      return
    }
    const filepaths = this.resourcePath.split('/')
    filepaths.pop()
    const filepath = filepaths.join('/')
    const cssFullPath = path.resolve(filepath, cssFilename)
    const cssExist = fs.existsSync(cssFullPath)
    if (cssExist) {
      this.hash = hash(cssFullPath)
    } else {
      const rootDir = `${process.cwd()}/src`
      const fullPath = getFileFullPath(rootDir, cssFilename)
      if (fullPath) {
        this.hash = hash(fullPath)
      } else {
        console.log(`未找到${this.resourcePath}文件中导入的${cssFilename}文件，无法生成css scope`)
      }
    }
  }
  visitJSXOpeningElement(n: JSXOpeningElement): JSXOpeningElement {
    n.attributes = this.setScopeAttribute(n.attributes)
    return n
  }
  /**
   * 设置data-scope-*
   */
  setScopeAttribute(
    attributes: JSXAttributeOrSpread[] | undefined
  ): JSXAttributeOrSpread[] | undefined {
    if (attributes && this.hash) {
      let lastAttr: JSXAttribute
      if (attributes.length > 0) {
        lastAttr = attributes[attributes.length - 1] as JSXAttribute
      }
      const start = lastAttr ? lastAttr.span.end + 1 : 0
      const span = { start, end: start + this.hash.length, ctxt: 0 }
      attributes.push({
        type: 'JSXAttribute',
        span,
        name: {
          type: 'Identifier',
          span,
          value: `data-scoped-${this.hash}`,
          optional: false,
        },
        value: null,
      })
    }

    return attributes
  }
}
