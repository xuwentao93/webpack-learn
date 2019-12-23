const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css指纹.
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin') // 优化打包日志.
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin') // 缓存.

// Notice me! please use image-webpack-plugin to minify images' size.

module.exports = {
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
          {
            loader: 'thread-loader', // 多进程打包, 加快打包速度.
            options: {
              workers: 3
            }
          },
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
      filename: './css/[name]_[contenthash:8].css' // css output file.
    }),
    new FriendlyErrorsWebpackPlugin(),
    new HardSourceWebpackPlugin()
  ]
}
