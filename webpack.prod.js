const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html 压缩
const CleanWebpackPlugin = require('clean-webpack-plugin') // 打包的时候清空output对应目录的文件
const TerserPlugin = require('terser-webpack-plugin') // 并行压缩, 加快压缩速度.
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin') // 配置每次都要加载的模块,
// 如react, react-dom等.
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // css压缩.
const cssnano = require('cssnano') // OptimizeCssAssetsWebpackPlugin的依赖.
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin') // 各个模块加载的速度测试.
const merge = require('webpack-merge')
const webpackBase = require('./webpack.base.js')

const webpackConfig = merge(webpackBase, {
  entry: path.join(__dirname, './app/main.js'), // 入口文件
  output: {
    path: path.join(__dirname, './dist'), // 打包后的文件存放的地方
    filename: './js/[name]_[hash:8].js' // 打包后输出文件的文件名
    // filename: '/js/bundle.js'
  },
  // stats ohters value:
  // minimal(error or compile), none, normal(standard output), verbose(every time).
  stats: 'errors-only',
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true
      })
    ]
  },
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
    new CleanWebpackPlugin(),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
          global: 'React'
        },
        {
          module: 'react-dom',
          entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDOM'
        }
      ]
    }),
    new SpeedMeasureWebpackPlugin(),
    new webpack.DllReferencePlugin({ // 引入这个插件, 将我们经常打包的东西引入进来, 优化项目体积和构建速度.
      // eslint-disable-next-line global-require
      manifest: require('./build/library/library.json')
    })
  ]
})

module.exports = webpackConfig
