const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css指纹.
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin') // 优化打包日志.
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin') // 缓存.

module.exports = {
  // entry: path.join(__dirname, './app/main.js'), // 入口文件
  // output: {
  //   path: path.join(__dirname, './dist'), // 打包后的文件存放的地方
  //   // filename: "[name]_[hash:8].js" // 打包后输出文件的文件名
  //   filename: 'bundle.js'
  // },
  // stats ohters value:
  // minimal(error or compile), none, normal(standard output), verbose(every time).
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
    },
    extensions: ['.js', '.jsx'] // 引入此类型文件时, 省略文件后缀名.
  },
  devtool: 'source-map', // 开启以后可以根据源码调试.
  mode: 'production',
  module: {
    rules: [
      {
        test: /(.js|.jsx)$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ],
        exclude: path.join(__dirname, './node_modules')
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: 'file-loader'
        // options: {
        //   name: 'img/[name][hash:8].[ext]'
        // }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new FriendlyErrorsWebpackPlugin(),
    new HardSourceWebpackPlugin()
  ]
}
