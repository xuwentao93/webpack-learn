'use strict';

const webpack = require('webpack')

module.exports = {
  entry:  __dirname + "/app/main.js", // 已多次提及的唯一入口文件
  output: {
    path: __dirname + "/dist", // 打包后的文件存放的地方
    // filename: "[name][chunkhash:8].js" // 打包后输出文件的文件名
    filename: 'bundle.js'
  },
  // devtool: "source-map",
  devServer: {
    contentBase: './dist',
    port: 3333
 },
  module: {
    rules: [
      {
        test: /(.js|.jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /(.jpg|.png|.gif|.jpeg)$/,
        use: 'file-loader',
        // options: {
        //   name: 'img/[name][hash:8].[ext]'
        // }
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: `[name][]`
    // })
  ]

}