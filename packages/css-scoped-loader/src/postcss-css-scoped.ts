import type { AttributeOptions, Selector } from 'postcss-selector-parser'
import selectorParser from 'postcss-selector-parser'

const plugin = (id: string) => {
  return {
    postcssPlugin: 'postcss-css-scoped',
    Once(root) {
      root.each((node) => {
        if (!node.selector) {
          return
        }

        node.selector = selectorParser((selectors) => {
          selectors.each((selector: Selector) => {
            let node: any = null
            selector.each((n: any) => {
              if (n.type === 'pseudo' && n.value === '::global') {
                n.value = n.spaces.before = n.spaces.after = ''
                return false
              }
              if (n.type !== 'pseudo' && n.type !== 'combinator') {
                node = n
              }
            })
            selector.insertAfter(
              node,
              selectorParser.attribute({
                attribute: `data-scope-${id}`,
              } as AttributeOptions)
            )
          })
        }).processSync(node.selector)
      })
    },
  }
}
plugin.postcss = true
export default plugin