if (typeof window === 'undefined') {
  global.window = {}
}

const fs = require('fs')
const path = require('path')
const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/main-server') // 获取 html 模板.

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8') // 读取模板.
const renderMarkup = (str) => template.replace('<!-- HTML_PLACEHOLDER -->', str) // 将模板的注释部分
// 换成我们的页面.
const html = renderMarkup(renderToString(SSR))
console.log(html)

const server = (port) => {
  const app = express()
  app.use(express.static('dist'))
  app.get('/home', (req, res) => {
    res.send(html)
  })

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
  })
}

server(process.env.PORT || 3000)
