import babel from './babel-loader'
import swc from './swc-loader'

export default function jsxLoader(source) {
  const { loader = 'babel' } = this.getOptions()
  const loaders = { babel, swc }
  const { code } = loaders[loader](source, this.resourcePath)
  return code
}
