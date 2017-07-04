const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './public/app/index.js',
  output: {
    path: path.resolve(__dirname, './public/build'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {test: /\.(js)$/, use: 'babel-loader'},
      {test: /\.(css)$/, use: ['style-loader', 'css-loader']}
    ]
  },
  plugins: [new HTMLWebpackPlugin({
    template: './public/app/index.html'
  })]
}
