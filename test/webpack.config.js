/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: ['swc-loader', path.resolve(__dirname, '../packages/jsx-scoped-loader/lib/index.js')],
      },
      {
        test: /\.scoped\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          path.resolve(__dirname, '../packages/css-scoped-loader/lib/index.js'),
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: 'index.html' })],
}
