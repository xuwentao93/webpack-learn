'use strict';

const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css指纹.
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // css压缩.
const htmlWebpackPlugin = require('html-webpack-plugin') // html 压缩
const CleanWebpackPlugin = require('clean-webpack-plugin') // 打包的时候清空output对应目录的文件
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin') // 配置每次都要加载的模块,
// 如react, react-dom等.

module.exports = {
  entry:  __dirname + "/app/main.js", // \入口文件
  output: {
    path: __dirname + "/dist", // 打包后的文件存放的地方
    // filename: "[name]_[hash:8].js" // 打包后输出文件的文件名
    filename: 'bundle.js'
  },
  devtool: "source-map",
  devServer: {
    contentBase: './dist',
    port: 3333
 },
  module: {
    rules: [
      {
        test: /(.js|.jsx)$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
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
  mode: 'production',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new optimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano') // 依赖这个, 也要装.
    }),
    new htmlWebpackPlugin({
      template: path.join(__dirname, './app/index.html'), // 路径
      filename: 'index.html',
      chunks: ['main'], // 那个js文件导入.
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDOM',
        },
      ]
  }),
  ],
  devtool: 'source-map' // 开启以后可以根据源码调试.

}