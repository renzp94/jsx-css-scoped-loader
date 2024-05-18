const HtmlWebpackPlugin = require('html-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          'swc-loader',
          {
            loader: '@renzp/jsx-scoped-loader',
            options: { loader: 'swc' },
          },
        ],
      },
      {
        test: /\.scoped\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', '@renzp/css-scoped-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: 'index.html' })],
}
