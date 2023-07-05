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

/**
 * 获取文件的全路径
 * @param dir 查询的目录
 * @param filename 查询的文件
 * @returns 找到则返回文件全路径，未找到则返回undefined
 */
const getFileFullPath = (fullDir: string, filename: string) => {
  const filter = (method) => (item: string) => fs.statSync(`${fullDir}/${item}`)[method]()
  const list = fs.readdirSync(fullDir)
  const files = list.filter(filter('isFile'))
  const dirs = list.filter(filter('isDirectory'))

  const isExist = files.includes(filename)
  if (isExist) {
    return `${fullDir}/${filename}`
  }
  if (dirs.length === 0) {
    return undefined
  }
  const dirTarget = dirs.find((dir: string) => getFileFullPath(`${fullDir}/${dir}`, filename))

  return dirTarget ? `${fullDir}/${dirTarget}/${filename}` : undefined
}

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

    return n
  }
  /**
   * 设置hash
   */
  setHash(n: StringLiteral) {
    const cssFilename = n.value?.split('/')?.pop()
    const regex = /\.scoped.(css|less|scss|sass)$/
    if (cssFilename && regex.test(cssFilename)) {
      const filepaths = this.resourcePath.split('/')
      filepaths.pop()
      const filepath = filepaths.join('/')
      const cssFullPath = path.resolve(filepath, cssFilename)
      const cssExist = fs.existsSync(cssFullPath)
      if (cssExist) {
        this.hash = hash(cssFullPath)
      } else {
        const rootDir = `${process.cwd()}/src`
        const fullPath = getFileFullPath(rootDir, cssFilename).replace(/\\/g, '/')
        if (fullPath) {
          this.hash = hash(fullPath)
        } else {
          console.log(`未找到${this.resourcePath}文件中导入的${cssFilename}文件，无法生成css scope`)
        }
      }
    }
  }
  visitJSXOpeningElement(n: JSXOpeningElement): JSXOpeningElement {
    n.attributes = this.setScopeAttribute(n.attributes) as JSXAttributeOrSpread[]
    return n
  }
  /**
   * 设置data-scope-*
   */
  setScopeAttribute(
    attributes: JSXAttributeOrSpread[] | undefined
  ): JSXAttributeOrSpread[] | undefined {
    if (attributes && this.hash) {
      let lastAttr: JSXAttribute | null = null
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
        value: undefined,
      })
    }

    return attributes
  }
}
