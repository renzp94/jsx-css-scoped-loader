# css-scoped-loader

为`css`文件中添加`scoped`的`loader`

> 注意：需要搭配`@renzp/jsx-scoped-loader`一起使用

## Usage

```
npm init @renzp/css-scoped-loader
```

```js
module: {
  rules: [
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

## 样式穿透

如果需要样式穿透，可以使用`::global`

`原始代码`

```css
.app {
  color: #000;
}
::global .app {
  font-size: 20px;
}
```

`转换之后代码`

```css
.app[data-scope-4ef1f8c9] {
  color: #000;
}
.app {
  font-size: 20px;
}
```
