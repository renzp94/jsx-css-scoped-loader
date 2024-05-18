import postcssCssScoped from '@renzp/postcss-css-scoped'
import postcss from 'postcss'

export default function cssLoader(source) {
  const { css } = postcss([postcssCssScoped(this.resourcePath)]).process(source)
  return css
}
