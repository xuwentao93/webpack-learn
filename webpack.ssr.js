const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html 压缩
const CleanWebpackPlugin = require('clean-webpack-plugin') // 打包的时候清空output对应目录的文件
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin') // 配置每次都要加载的模块,
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // css压缩.
const cssnano = require('cssnano') // OptimizeCssAssetsWebpackPlugin的依赖.
const merge = require('webpack-merge')
const webpackBase = require('./webpack.base')
// 如react, react-dom等.

module.exports = merge(webpackBase, {
  entry: path.join(__dirname, './app/main-server.js'), // 入口文件
  output: {
    path: path.join(__dirname, './dist'), // 打包后的文件存放的地方
    // filename: "[name]_[hash:8].js" // 打包后输出文件的文件名
    filename: '[name]-server.js',
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: './dist',
    port: 3333
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map', // 开启以后可以根据源码调试.
  mode: 'production',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano // 依赖这个, 也要装.
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './app/index.html'), // 路径
      filename: 'index.html', // default: index.html, so you can don't write this property if value is
      // index.html.
      chunks: ['main'], // 那个js文件导入.
      inject: true, // true或者body 放在body后面, 不然放在head里面.默认就是true.
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new CleanWebpackPlugin()
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
    //       global: 'React'
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
    //       global: 'ReactDOM'
    //     }
    //   ]
    // })
  ]
})
