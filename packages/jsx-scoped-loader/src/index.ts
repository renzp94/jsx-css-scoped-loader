import { babelLoader } from './babel-plugin-scoped'
import { swcLoader } from './swc-scoped-visitor'

export default function jsxLoader(source) {
  const { loader = 'babel' } = this.getOptions()
  const loaders = {
    babel: babelLoader,
    swc: swcLoader,
  }
  const { code } = loaders[loader](source, this.resourcePath)
  return code
}
