import { transformSync } from '@babel/core'
import BabelPluginJsxScoped from '@renzp/babel-plugin-jsx-scoped'

export default (source: string, filename: string) => {
  return transformSync(source, {
    filename,
    presets: [
      require.resolve('@babel/preset-typescript'),
      require.resolve('@babel/preset-react'),
    ],
    plugins: [BabelPluginJsxScoped],
  })
}
