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
