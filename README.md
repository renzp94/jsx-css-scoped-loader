# jsx-css-scoped-loader

在`jsx`实现`css scoped`的`webpack loader`、`babel plugin`、`swc plugin`、`postcss plugin`。

- 处理`jsx`文件的`webpack loader`: `@renzp/jsx-scoped-loader`
- 处理`jsx`文件的`babel plugin`: `@renzp/babel-plugin-jsx-scoped`
- 处理`jsx`文件的`swc plugin`: `@renzp/swc-jsx-scoped`
- 处理`css`文件的`webpack loader`: `@renzp/css-scoped-loader`
- 处理`css`文件的`postcss plugin`: `@renzp/postcss-css-scoped`

> Tips: 如果要实现`css scoped`的话，需要同时使用`JSX`和`CSS`的处理插件。


原理：通过将css文件中的类名全部转化为`xx[data-scoped-xxx]`，然后将每个有className的元素加上`data-scoped-xxx`属性

`css`
```css
/* 转化前 */
.test{
  color: red;
}
/* 转化后 */
.test[data-scoped-729a2688]{
  color:red;
}
```

`tsx`

```tsx
// 转化前
<div className="test">test</div>
// 转化后
<div class="test" data-scoped-729a2688="true">test</div>
```

如果需要在css Scoped文件中写全局样式可以通过`::global`

```css
::global .test {
  color: red;
}
```


## webpack

```bash
npm i @renzp/jsx-scoped-loader @renzp/css-scoped-loader -D
```

`webpack.config.js`

```js
module: {
  rules: [
    {
      test: /\.tsx$/,
      exclude: /node_modules/,
      use: ['swc-loader', '@renzp/jsx-scoped-loader'],
    },
    {
      test: /\.scope\.css$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        'css-loader',
        '@renzp/css-scoped-loader',
      ],
    },
  ],
},
```

## babel

如果你没有用`webpack`，但是用了`babel`，那么可以使用babel插件：`@renzp/babel-plugin-jsx-scoped`，但是还需要配置`postcss`处理的插件：`@renzp/postcss-css-scoped`


## swc

可以使用swc插件：`@renzp/swc-jsx-scoped`和`postcss`处理的插件：`@renzp/postcss-css-scoped`
