# jsx-scoped-loader

为`jsx`文件中添加`scoped`的`loader`

> 注意：需要搭配`@renzp/css-scoped-loader`一起使用

## Usage

```
npm init @renzp/jsx-scoped-loader
```

```js
module: {
  rules: [
    {
      test: /\.tsx$/,
      exclude: /node_modules/,
      use: ['swc-loader', '@renzp/jsx-scoped-loader'],
    },
  ],
},
```

## Options

- loader: 'babel' | 'swc'，默认为'babel'
