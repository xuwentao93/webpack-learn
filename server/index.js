if (typeof window === 'undefined') {
  global.window = {}
}

const fs = require('fs')
const path = require('path')
const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/main-server')

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
const renderMarkup = (str) => template.replace('<!-- HTML_PLACEHOLDER -->', str)
const html = renderMarkup(renderToString(SSR))

fs.writeFileSync(path.join(__dirname, '../dist/index.html'), html)
const server = (port) => {
  const app = express()
  app.use(express.static('dist'))
  // app.get('/index', (req, res) => {
  //   const html = renderMarkup(renderToString(SSR))
  //   res.status(200).send(html)
  // })

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
  })
}

server(process.env.PORT || 3000)
