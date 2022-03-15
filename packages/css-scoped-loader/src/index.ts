import postcss from 'postcss'
import postcssCssScoped from './postcss-css-scoped'

export default function cssLoader(source) {
  const { css } = postcss([postcssCssScoped(this.resourcePath)]).process(source)
  return css
}
