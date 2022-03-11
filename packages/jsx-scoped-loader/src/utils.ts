import fs from 'fs'

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
