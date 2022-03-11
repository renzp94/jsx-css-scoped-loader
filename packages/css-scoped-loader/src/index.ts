import hash from 'hash-sum'
import postcss from 'postcss'
import postcssCssScoped from './postcss-css-scoped'

export default function cssLoader(source) {
  const id = hash(this.resourcePath)
  const { css } = postcss([postcssCssScoped(id)]).process(source)
  return css
}
