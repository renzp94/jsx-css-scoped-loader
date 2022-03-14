import fs from 'fs'
import hash from 'hash-sum'
import { transformSync } from '@babel/core'
import { getFileFullPath } from './utils'

export const BabelPluginScoped = (babel) => {
  const t = babel.types
  let hashId
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const n = path.node.source
        const cssFilename = n.value?.split('/')?.pop()
        const regex = /\.scoped.(css|less|scss|sass)$/
        if (!regex.test(cssFilename)) {
          return
        }
        const resourcePath = state.opts.resourcePath
        const filepaths = resourcePath.split('/')
        filepaths.pop()
        const filepath = filepaths.join('/')
        const cssFullPath = `${filepath}/${cssFilename}`
        const cssExist = fs.existsSync(cssFullPath)
        if (cssExist) {
          hashId = hash(cssFullPath)
        } else {
          const rootDir = `${process.cwd()}/src`
          const fullPath = getFileFullPath(rootDir, cssFilename)
          if (fullPath) {
            hashId = hash(fullPath)
          } else {
            console.log(`未找到${resourcePath}文件中导入的${cssFilename}文件，无法生成css scope`)
          }
        }
      },
      JSXOpeningElement(path) {
        const { name, selfClosing } = path.node
        const attrs = path.node.attributes
        const attr = attrs.find((attr) => attr.name.name === 'className')
        const scopedName = t.jsxIdentifier(`data-scoped-${hashId}`)
        if (attr && hashId) {
          const scopedAttr = t.jSXAttribute(scopedName, null)
          attrs.push(scopedAttr)
          t.jsxOpeningElement(name, attrs, selfClosing)
        }
      },
    },
  }
}

export const babelLoader = (source: string, resourcePath: string) => {
  return transformSync(source, {
    filename: resourcePath,
    presets: [require.resolve('@babel/preset-typescript'), require.resolve('@babel/preset-react')],
    plugins: [[BabelPluginScoped, { resourcePath }]],
  })
}
