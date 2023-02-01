import fs from 'fs'
import hash from 'hash-sum'

/**
 * 获取文件的全路径
 * @param dir 查询的目录
 * @param filename 查询的文件
 * @returns 找到则返回文件全路径，未找到则返回undefined
 */
export const getFileFullPath = (fullDir: string, filename: string) => {
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

const plugin = (babel) => {
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
        const filepaths = state.filename.split('/')
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
            console.log(`未找到${state.filename}文件中导入的${cssFilename}文件，无法生成css scope`)
          }
        }
      },
      JSXOpeningElement(path) {
        const { name, selfClosing } = path.node ?? {}
        const attrs = path.node.attributes
        const attr = attrs.find((attr) => attr?.name?.name === 'className')
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

export default plugin
