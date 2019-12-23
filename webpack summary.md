本文是自己对近几天 webpack 所学收获的一个总结, 完全是个人(新手)经验, 也仅供自己参考.

安装内容:
一. base:

1. webpack: webpack webpack-cli webpack-dev-server -D

2. loaders: babel-loader eslint-loader css-loader style-loader file-loader thread-loader -D

3. babel: @babel/core @babel/preset-env @babel/preset-react babel-eslint -D

4. eslint: eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react -D

5. react: react react-dom react-router react-router-dom redux react-redux -S

6. plugins: mini-css-extract-plugin`(css指纹)`, friendly-errors-webpack-plugin`(日志打印优化)`,
   hard-source-webpack-plugin`(利用缓存实现二次构建加速)`.

7. others: less less-loader -D

二. prod: (目前我发现, 只有生产情况下需要安装额外的插件, 服务端渲染的知识个人还没深入学习, 目前与 prod 相同)

1. plugins: html-webpack-plugin`(html压缩)`, clean-webpack-plugin`(打包前删除之前打包的文件)`,
   terser-webpack-plugin`(并行压缩, 加快压缩速度)`, optimize-css-assets-webpack-plugin`(显示各个模块的加载时间)`, webpack-merge`(合并webpack配置文件)`.

三. base 配置须知:

1. 除基本的外, 额外需要知道: `MiniCssExtractPlugin` 中可以配置 css 的出口目录, 同时在 loader 中放在
   style-loader 和 css-loader 之间(使用MiniCssExtractPlugin.loader)

2. `reslove` 中 配置 `extensions` 可以处理文件后缀名引入的省略.

3. `exclude` 属性可以忽略 loader 对他们的解析(常见用于node_modules).

4. `thread-loader` 可以开启多个进程加快对js的解析.

5. 配置 `webpack.DllReferencePlugin` 加载 dll 打包后的文件, 可以加快打包速度.

四. dev 配置须知:

1. 配置 `devServer` 来开启热更替, 设置端口, 设置日志打印情况等等.

五. prod 配置须知: 

1. `TerserPlugin` 的配置有点不同, 需要关注.

2. `HtmlWebpackPlugin` 用来设置 .html 文件的出口位置.

3. (notice me!)目前还有图片压缩相关的插件, 由于相关内容比较大而且出现过权限报错, 打算更换系统在尝试这方面的内容.

六. dll 配置须知:

1. enrty 中设置 library 数组, 导出常用的 modules(如 react, redux 等等).

2. 配置 webpack 自带的 `DllPlugin` 插件来生成 json 文件, 来给 base 引入减少加载时间.

七. ssr 配置须知:

1. 目前过于不成熟, 暂不描述他, 等后续回来一定会补充.

以上是我个人告知我个人日后配置需要注意的事项, 后续会补充, 如果某位大佬不慎看到此篇文章, 希望能提供一些进阶学习的建议. happy coding!

